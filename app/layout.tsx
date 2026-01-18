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
  const recentYearsOptions = [2, 5, Infinity];

  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <div className="flex flex-col gap-2 p-2 print:hidden">
          {/* Environment info */}
          {isDev && (
            <div className="flex gap-2">
              <p>Contentful: {env.CONTENTFUL_ENVIRONMENT}</p>
              <p>Node: {env.NODE_ENV}</p>
            </div>
          )}

          {/* Export and recent years filter */}
          <div className="flex items-center justify-between gap-2">
            <ExportButton />
            <div className="flex gap-2">
              <RecentYearsFilter recentYearsOptions={recentYearsOptions} />
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
