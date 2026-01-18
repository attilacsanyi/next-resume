import { env } from '@/env';
import { parseRecentYears } from '@/features/resume';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const queryString = searchParams.toString();

  try {
    const host = request.headers.get('host');
    const protocol =
      env.NODE_ENV === 'production' && host !== 'localhost:3000'
        ? 'https'
        : 'http';
    const baseUrl = queryString
      ? `${protocol}://${host}?${queryString}`
      : `${protocol}://${host}`;

    // Conditional browser setup for local vs serverless
    const browser = await (async () => {
      if (env.NODE_ENV === 'production') {
        // Production: Use puppeteer-core with @sparticuz/chromium
        const puppeteerCore = (await import('puppeteer-core')).default;
        const chromium = (await import('@sparticuz/chromium')).default;

        return puppeteerCore.launch({
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath(), // This finds the bin files we included
          headless: chromium.headless,
        });
      } else {
        // Local dev: Use regular puppeteer with bundled Chrome
        const puppeteer = (await import('puppeteer')).default;

        return puppeteer.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
      }
    })();

    const page = await browser.newPage();

    // Force dark mode
    await page.emulateMediaFeatures([
      { name: 'prefers-color-scheme', value: 'dark' },
    ]);

    await page.setViewport({
      width: 794,
      height: 1123,
      deviceScaleFactor: 2,
    });

    // Navigate to the page
    await page.goto(`${baseUrl}`, {
      waitUntil: ['load', 'networkidle0'],
      timeout: 60000,
    });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      scale: 0.75, // Adjust scale to prevent content overflow
    });

    await browser.close();

    // Generate date string for file name
    const date = new Date()
      .toLocaleDateString('en-GB', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      })
      .split('/')
      .join('');

    // Get recent years filter
    const recentYearsParam = searchParams.get('recentYears');
    const recentYears = parseRecentYears(recentYearsParam);

    const recentYearsPart = isFinite(recentYears)
      ? ['last', recentYears, recentYears > 1 ? 'years' : 'year']
      : [];

    // Generate file name
    const fileName = ['Attila_Csanyi', 'CV', ...recentYearsPart, date].join(
      '_'
    );

    return new Response(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}.pdf"`,
      },
      status: 200,
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return Response.json(
      { error: `Failed to generate PDF: ${(error as Error).message}` },
      { status: 500 }
    );
  }
};
