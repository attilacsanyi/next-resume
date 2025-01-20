import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

const resumeFileName = 'attila-csanyi-resume.pdf';
/**
 * Export the root page as a PDF.
 *
 * @param request https://www.browserless.io/blog/puppeteer-netlify
 * @returns the PDF as a response
 */
export const GET = async (request: NextRequest) => {
  const host = request.headers.get('host');
  const protocol =
    process.env.NODE_ENV === 'production' && host !== 'localhost:3000'
      ? 'https'
      : 'http';
  const baseUrl = `${protocol}://${host}`;

  try {
    // const browser =
    //   await puppeteer.launch(/* {
    //   args: [
    //     '--no-sandbox',
    //     '--disable-setuid-sandbox',
    //     '--disable-dev-shm-usage',
    //     '--font-render-hinting=none',
    //   ],
    //   env: {
    //     ...process.env,
    //     LANG: 'en_US.UTF-8',
    //   },
    // } */);

    const browser = await puppeteer.connect({
      browserWSEndpoint: `wss://chrome.browserless.io?--window-size=1200,900`,
    });

    const page = await browser.newPage();

    // Set viewport for consistent rendering
    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 1,
    });

    // Navigate to the page with a timeout
    await page.goto(`${baseUrl}`, {
      waitUntil: 'networkidle0',
      timeout: 10000,
    });

    // Generate PDF with specific settings
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${resumeFileName}"`,
      },
      status: 200,
    });
  } catch (error: unknown) {
    const errorMsg = `Error generating PDF from '${baseUrl}': ${JSON.stringify(
      error
    )}`;
    console.error(errorMsg);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
};
