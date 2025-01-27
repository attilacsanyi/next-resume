import { resumeSchema } from '@/features/resume/resume.types';

export const validateResumeJSON = (resumeData: object) => {
  const validateResume = resumeSchema.safeParse(resumeData);

  if (!validateResume.success) {
    const errors = validateResume.error.flatten().fieldErrors;
    Object.entries(errors).forEach(([field, messages]) => {
      console.error(
        `Field "${field}" has validation errors:`,
        messages?.join(', ')
      );
    });
    throw new Error('Invalid resume data');
  }

  return validateResume.data;
};
