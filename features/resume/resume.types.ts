import { z } from 'zod';

export const techTypeSchema = z.enum(['skill', 'tool', 'lib']);
export const positionTypeSchema = z.enum(['on-site', 'remote']);

export type TechType = z.infer<typeof techTypeSchema>;
export type PositionType = z.infer<typeof positionTypeSchema>;

export const locationSchema = z.object({
  city: z.string().optional(),
  country: z.string().optional(),
  region: z.string().optional(),
});
export type Location = z.infer<typeof locationSchema>;

export const periodSchema = z.object({
  start: z.string().date(),
  end: z.string().date().optional(),
});
export type Period = z.infer<typeof periodSchema>;

export const socialsSchema = z.object({
  email: z.string().email(),
  linkedin: z.string().url(),
  github: z.string().url(),
  twitter: z.string().url(),
});
export type Socials = z.infer<typeof socialsSchema>;

export const profileSchema = z.object({
  name: z.string(),
  headline: z.string(),
  location: locationSchema,
  socials: socialsSchema,
  languages: z.array(z.string()),
  summary: z.array(z.string()),
});
export type Profile = z.infer<typeof profileSchema>;

export const technologySchema = z.object({
  name: z.string(),
  type: techTypeSchema,
  featured: z.boolean(),
});
export type Technology = z.infer<typeof technologySchema>;

export const positionSchema = z.object({
  title: z.string(),
  type: positionTypeSchema,
  dates: periodSchema,
});
export type Position = z.infer<typeof positionSchema>;

export const companySchema = z.object({
  name: z.string(),
  website: z.string().url().optional(),
  location: locationSchema.optional(),
  description: z.string(),
});
export type Company = z.infer<typeof companySchema>;

export const recommendationSchema = z.object({
  name: z.string(),
  title: z.string(),
  profile: z.object({
    type: z.literal('linkedin'),
    url: z.string().url(),
  }),
  date: z.string().date(),
  feedback: z.array(z.string()),
});
export type Recommendation = z.infer<typeof recommendationSchema>;

export const experienceSchema = z.object({
  company: companySchema,
  position: positionSchema,
  recommendations: z.array(recommendationSchema).optional(),
  achievements: z.array(z.string()),
  technologies: z.array(technologySchema),
});
export type Experience = z.infer<typeof experienceSchema>;

export const educationSchema = z.object({
  institution: z.string(),
  dates: periodSchema,
  degree: z.string().optional(),
});
export type Education = z.infer<typeof educationSchema>;

export const learningSchema = z.object({
  title: z.string(),
  date: z.string().date(),
  certificate: z.string().optional(),
  percentage: z.number().optional(),
  note: z.string().optional(),
});
export type Learning = z.infer<typeof learningSchema>;

export const developmentSchema = z.object({
  name: z.string(),
  description: z.string(),
  dates: periodSchema,
  tags: z.array(z.string()),
  github: z.string().url(),
  url: z.string().url(),
});

export type Development = z.infer<typeof developmentSchema>;

export const resumeSchema = z.object({
  profile: profileSchema,
  learnings: z.array(learningSchema),
  experiences: z.array(experienceSchema),
  educations: z.array(educationSchema),
  developments: z.array(developmentSchema),
});
export type Resume = z.infer<typeof resumeSchema>;
