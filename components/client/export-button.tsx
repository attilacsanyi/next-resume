'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Button } from '../server';

const DownloadAsPdfButton = () => (
  <Button variant="primary">Download as PDF</Button>
);

const ExportButtonContent = () => {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  return (
    <Link
      className="cursor-pointer"
      href={`/api/export${queryString ? `?${queryString}` : ''}`}
    >
      <DownloadAsPdfButton />
    </Link>
  );
};

export const ExportButton = () => {
  return (
    <Suspense fallback={<DownloadAsPdfButton />}>
      <ExportButtonContent />
    </Suspense>
  );
};
