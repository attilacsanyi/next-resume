import { ZodError } from 'zod';
import { resumeSchema } from './resume.types';

export const validateResumeJSON = (resumeData: object) => {
  try {
    const validateResume = resumeSchema.parse(resumeData);
    return validateResume;
  } catch (error) {
    if (error instanceof ZodError) {
      // Collect and format all validation errors
      const errorDetails = error.errors
        .map(err => `${err.path.join('.')}: ${err.message}`)
        .join('\n');

      throw new Error(`Invalid resume data!\n\n ${errorDetails}`);
    }

    throw error;
  }
};

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
