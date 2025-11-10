'use client';

import { Button } from '@/components/server';
import { parseRecentYears } from '@/features/resume/utils/date.util';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type RecentYearsFilterProps = {
  recentYearsOptions: number[];
};

export const RecentYearsFilter = ({
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
              : 'Full history'}
          </Button>
        </Link>
      ))}
    </>
  );
};
