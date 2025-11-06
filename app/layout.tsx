import { env } from '@/env';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Attila Csanyi - Resume',
  description: 'Professional Resume of Attila Csanyi',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const isDev = env.NODE_ENV !== 'production';
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {isDev && (
          <div className="flex justify-between p-2 print:hidden">
            <Link
              className="cursor-pointer"
              href="/api/export"
            >
              <button className="rounded-lg bg-linear-to-r from-blue-500 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-xs hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-hidden">
                Download as PDF
              </button>
            </Link>
            <div className="flex gap-2">
              <p>Contentful: {env.CONTENTFUL_ENVIRONMENT}</p>
              <p>Node: {env.NODE_ENV}</p>
            </div>
          </div>
        )}
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
