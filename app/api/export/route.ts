import { env } from '@/env';
import { parseRecentYears } from '@/features/resume';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const queryString = searchParams.toString();

  let browser = null;

  try {
    const host = request.headers.get('host');
    const protocol =
      env.NODE_ENV === 'production' && !host?.includes('localhost')
        ? 'https'
        : 'http';
    const baseUrl = `${protocol}://${host}${queryString ? `?${queryString}` : ''}`;
    // Conditional browser setup for local vs serverless
    if (env.NODE_ENV === 'production') {
      const puppeteerCore = (await import('puppeteer-core')).default;
      const chromium = (await import('@sparticuz/chromium')).default;

      browser = await puppeteerCore.launch({
        args: [
          ...chromium.args,
          '--disable-dev-shm-usage', // Prevents crashes in low-memory environments
          '--disable-gpu',
          '--no-sandbox',
          '--single-process', // Recommended for serverless to reduce overhead
        ],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
    } else {
      const puppeteer = (await import('puppeteer')).default;
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    }

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
    await page.goto(baseUrl, {
      waitUntil: ['networkidle0', 'domcontentloaded'],
      timeout: 30000, // 30s is safer for Netlify's execution limit
    });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      scale: 0.75,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
    });

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
  } finally {
    // Close the browser to prevent "zombie" processes and memory leaks that cause the next request to fail.
    if (browser !== null) {
      await browser.close();
    }
  }
};
