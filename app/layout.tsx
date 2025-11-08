import { ExportButton } from '@/components/client';
import { Button } from '@/components/server';
import { env } from '@/env';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
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
  const recentYearsOptions = [Infinity, 1, 2, 5, 10];

  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {isDev && (
          <div className="flex justify-between p-2 print:hidden">
            <div className="flex gap-2">
              <ExportButton />
              {recentYearsOptions.map(year => (
                <Link
                  key={year}
                  className="cursor-pointer"
                  href={isFinite(year) ? `/?recentYears=${year}` : '/'}
                >
                  <Button>
                    {isFinite(year) ? `Last ${year} years` : 'All years'}
                  </Button>
                </Link>
              ))}
            </div>
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
