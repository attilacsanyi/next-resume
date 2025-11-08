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
