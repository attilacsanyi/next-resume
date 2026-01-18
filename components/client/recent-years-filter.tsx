'use client';

import { Button } from '@/components/server';
import { parseRecentYears } from '@/features/resume/utils/date.util';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

type RecentYearsFilterProps = {
  recentYearsOptions: number[];
};

const RecentYearsFilterContent = ({
  recentYearsOptions,
}: RecentYearsFilterProps) => {
  const searchParams = useSearchParams();
  const currentRecentYears = searchParams.get('recentYears');
  const recentYears = parseRecentYears(currentRecentYears);

  return (
    <>
      {recentYearsOptions.map(year => (
        <Link
          key={year}
          href={`/?recentYears=${year}`}
        >
          <Button
            size="sm"
            variant={recentYears === year ? 'primary' : 'default'}
          >
            {isFinite(year)
              ? `Last ${year} year${year > 1 ? 's' : ''}`
              : 'Full'}
          </Button>
        </Link>
      ))}
    </>
  );
};

export const RecentYearsFilter = (props: RecentYearsFilterProps) => {
  return (
    <Suspense fallback={<div className="flex gap-2">Loading...</div>}>
      <RecentYearsFilterContent {...props} />
    </Suspense>
  );
};
