'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '../server';

export const ExportButton = () => {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  return (
    <Link
      className="cursor-pointer"
      href={`/api/export${queryString ? `?${queryString}` : ''}`}
    >
      <Button variant="primary">Download as PDF</Button>
    </Link>
  );
};
