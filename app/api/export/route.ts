import chromium from '@sparticuz/chromium';
import { NextRequest, NextResponse } from 'next/server';
import puppeteerCore from 'puppeteer-core';

const resumeFileName = 'attila-csanyi-resume.pdf';

/**
 * Export the root page as a PDF.
 *
 * @param request The incoming request
 * @returns the PDF as a response
 */
export const GET = async (request: NextRequest) => {
  const host = request.headers.get('host');
  const protocol =
    process.env.NODE_ENV === 'production' && host !== 'localhost:3000'
      ? 'https'
      : 'http';
  const baseUrl = `${protocol}://${host}`;

  let browser;
  try {
    const isDev = process.env.NODE_ENV === 'development';

    if (isDev) {
      // For local development, use puppeteer instead of puppeteer-core
      const puppeteer = await import('puppeteer');
      browser = await puppeteer.default.launch({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        headless: 'new',
        args: ['--no-sandbox'],
      });
    } else {
      browser = await puppeteerCore.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      });
    }

    const page = await browser.newPage();

    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 1,
    });

    await page.goto(`${baseUrl}`, {
      waitUntil: 'networkidle0',
      timeout: 10000,
    });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    const base64Pdf = pdfBuffer.toString('base64');

    return new NextResponse(base64Pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${resumeFileName}"`,
        'Content-Transfer-Encoding': 'binary',
      },
      status: 200,
    });
  } catch (error: unknown) {
    if (browser) {
      await browser.close();
    }
    const errorMsg = `Error generating PDF from '${baseUrl}': ${JSON.stringify(
      error
    )}`;
    console.error(errorMsg);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
};
