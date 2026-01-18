'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { FaFilePdf } from 'react-icons/fa6';
import { Button } from '../server';

const DownloadAsPdfButton = () => (
  <Button variant="primary">
    {' '}
    <FaFilePdf /> Export
  </Button>
);

const ExportButtonContent = () => {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  return (
    <Link href={`/api/export${queryString ? `?${queryString}` : ''}`}>
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
