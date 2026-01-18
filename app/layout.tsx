import { ExportButton, RecentYearsFilter } from '@/components/client';
import { env } from '@/env';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Attila Csanyi - Resume',
  description: 'Professional Resume of Attila Csanyi',
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const isDev = env.NODE_ENV !== 'production';
  const recentYearsOptions = [2, 5, 10, Infinity];

  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {isDev ? (
          <div className="flex justify-between p-2 print:hidden">
            <div className="flex items-center gap-2">
              <ExportButton />
              <RecentYearsFilter recentYearsOptions={recentYearsOptions} />
            </div>
            <div className="flex gap-2">
              <p>Contentful: {env.CONTENTFUL_ENVIRONMENT}</p>
              <p>Node: {env.NODE_ENV}</p>
            </div>
          </div>
        ) : (
          <div className="relative p-2 print:hidden">
            <div className="flex justify-start gap-2 overflow-x-auto overflow-y-hidden scroll-smooth md:justify-end md:overflow-x-visible">
              <RecentYearsFilter recentYearsOptions={recentYearsOptions} />
            </div>
            <div className="from-background pointer-events-none absolute top-0 right-0 h-full w-32 bg-linear-to-l to-transparent md:hidden" />
          </div>
        )}
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
