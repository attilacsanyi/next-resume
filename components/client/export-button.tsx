'use client';

import { downloadFile } from '@/shared/utils';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { ExportButton as ExportButtonBase } from '../server';

const ExportButtonContent = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    setIsLoading(true);
    try {
      const queryString = searchParams.toString();
      await downloadFile(
        `/api/export${queryString ? `?${queryString}` : ''}`,
        'resume.pdf'
      );
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ExportButtonBase
      isLoading={isLoading}
      onClick={handleExport}
    />
  );
};

export const ExportButton = () => {
  return (
    <Suspense fallback={<ExportButtonBase />}>
      <ExportButtonContent />
    </Suspense>
  );
};
