import { calculateMaxYears, filterByRecentYears } from './date.util';

type SectionData<T> = null | {
  filteredItems: T[];
  subtitle: string;
  maxYears: number;
};

/**
 * Prepares section data by filtering items, calculating years, and generating subtitle.
 * This function encapsulates the common logic used across resume sections.
 *
 * @param items - Array of items to process
 * @param recentYears - Number of recent years or Infinity to filter by
 * @param getStartDate - Function to extract the start date from an item
 * @param getEndDate - Function to extract the end date from an item (or current date if ongoing)
 * @returns Object containing filtered items, subtitle, and calculated max years or null if no items
 *
 * @example
 * ```typescript
 * const { filteredItems, subtitle } = prepareSectionData(
 *   experiences,
 *   5,
 *   exp => new Date(exp.position.dates.start),
 *   exp => exp.position.dates.end ? new Date(exp.position.dates.end) : new Date()
 * );
 * ```
 */
export const prepareSectionData = <T>(
  items: T[],
  recentYears: number,
  getStartDate: (item: T) => Date,
  getEndDate: (item: T) => Date
): SectionData<T> => {
  const isRecentYearsFinite = isFinite(recentYears);

  const filteredItems = isRecentYearsFinite
    ? filterByRecentYears(items, recentYears, getEndDate)
    : items;

  if (filteredItems.length === 0) return null;

  const maxYears = isRecentYearsFinite
    ? recentYears
    : calculateMaxYears(items, getStartDate);

  // Generate subtitle based on whether filtering by recent years
  const subtitle = isRecentYearsFinite
    ? recentYears > 0
      ? `Last ${recentYears} year${recentYears > 1 ? 's' : ''}`
      : 'Recent year'
    : maxYears > 0
      ? `${maxYears} year${maxYears > 1 ? 's' : ''}`
      : 'Recent year';

  return { filteredItems, subtitle, maxYears };
};
