import { resumeSchema } from '@/features/resume/resume.types';
import { ZodError } from 'zod';

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
