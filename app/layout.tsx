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
  const recentYearsOptions = [1, 2, 5, 10, Infinity];

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
          <div className="flex justify-end gap-2 p-2 print:hidden">
            <RecentYearsFilter recentYearsOptions={recentYearsOptions} />
          </div>
        )}
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
