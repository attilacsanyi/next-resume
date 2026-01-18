'use client';

import { downloadFile } from '@/shared/utils';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { FaFilePdf, FaSpinner } from 'react-icons/fa6';
import { Button } from '../server';

type DownloadAsPdfButtonProps = {
  isLoading?: boolean;
  onClick?: () => void;
};

const DownloadAsPdfButton = ({
  isLoading = false,
  onClick,
}: DownloadAsPdfButtonProps) => (
  <Button
    disabled={isLoading}
    variant="primary"
    onClick={onClick}
  >
    {isLoading ? <FaSpinner className="animate-spin" /> : <FaFilePdf />}
    Export
  </Button>
);

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
    <DownloadAsPdfButton
      isLoading={isLoading}
      onClick={handleExport}
    />
  );
};

export const ExportButton = () => {
  return (
    <Suspense fallback={<DownloadAsPdfButton />}>
      <ExportButtonContent />
    </Suspense>
  );
};
