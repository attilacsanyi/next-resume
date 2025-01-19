import { NextRequest } from 'next/server';
import puppeteer from 'puppeteer';

const resumeFileName = 'attila-csanyi-resume.pdf';

export const GET = async (request: NextRequest) => {
  const host = request.headers.get('host');
  const protocol =
    process.env.NODE_ENV === 'production' && host !== 'localhost:3000'
      ? 'https'
      : 'http';
  const baseUrl = `${protocol}://${host}`;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the page
    await page.goto(`${baseUrl}`);

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${resumeFileName}"`,
      },
      status: 200,
    });
  } catch (error) {
    const errorMsg = `Error generating PDF from ${baseUrl}: ${JSON.stringify(
      error
    )}`;
    console.error(errorMsg);
    return Response.json({ error: errorMsg }, { status: 500 });
  }
};
