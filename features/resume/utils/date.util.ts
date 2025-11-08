/**
 * Filters items by recent years based on their end date (or current date if ongoing).
 * @param items - Array of items to filter
 * @param years - Number of recent years to include
 * @param getEndDate - Function to extract the end date from an item (or current date if ongoing)
 */
export const filterByRecentYears = <T>(
  items: T[],
  years: number,
  getEndDate: (item: T) => Date
): T[] => {
  const cutoffDate = new Date();
  cutoffDate.setFullYear(cutoffDate.getFullYear() - years);

  return items.filter(item => {
    const endDate = getEndDate(item);
    return endDate >= cutoffDate;
  });
};

/**
 * Calculates the maximum years of experience/activity from a collection of items.
 * @param items - Array of items to calculate from
 * @param getStartDate - Function to extract the start date from an item
 */
export const calculateMaxYears = <T>(
  items: T[],
  getStartDate: (item: T) => Date
): number => {
  if (items.length === 0) return 0;

  const now = new Date();
  const earliestStart = items.reduce((earliest, item) => {
    const startDate = getStartDate(item);
    return startDate < earliest ? startDate : earliest;
  }, getStartDate(items[0]));

  return now.getFullYear() - earliestStart.getFullYear();
};

/**
 * Parses and normalizes the recentYears query parameter.
 * - Returns Infinity for "show all" (when param is missing, invalid, or 0)
 * - Returns the parsed number when > 0
 *
 * @param recentYearsParam - The recentYears query parameter value (string | null | undefined)
 * @returns Normalized recentYears value (number | Infinity)
 *
 * @example
 *
 * parseRecentYears('5') // returns 5
 * parseRecentYears('0') // returns Infinity
 * parseRecentYears(null) // returns Infinity
 * parseRecentYears('invalid') // returns Infinity
 *  */
export const parseRecentYears = (
  recentYearsParam: string | null | undefined
): number => {
  if (!recentYearsParam) return Infinity;

  const parsed = Number.parseInt(recentYearsParam, 10);

  // Normalize 0 or invalid values to Infinity (show all)
  return Number.isNaN(parsed) || parsed <= 0 ? Infinity : parsed;
};

/**
 * Formats a date string to a localized date format (e.g., "Jan 2024").
 * @param dateString - ISO date string to format
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
};

/**
 * Formats a date period with start and optional end date.
 * @param start - Start date string
 * @param end - Optional end date string
 * @returns Formatted period string (e.g., "Jan 2024 - Present" or "Jan 2024 - Dec 2024")
 */
export const formatPeriod = (start: string, end?: string): string => {
  const startFormatted = formatDate(start);
  const endFormatted = end ? formatDate(end) : 'Present';
  return `${startFormatted} - ${endFormatted}`;
};
