import { client } from '@/features/contentful/apollo.client';
import { validateResumeJSON } from '@/features/resume/resume.util';
import { ResumeCollectionDocument } from './contentful.hooks';
import type { ResumeCollectionQuery } from './contentful.types';

export const getResume = async (preview = false) => {
  const { data } = await client.query<ResumeCollectionQuery>({
    query: ResumeCollectionDocument,
    variables: { isPreview: preview },
  });

  const validatedResume = validateResumeJSON(
    data.resumeCollection?.items[0].json
  );

  return validatedResume;
};
