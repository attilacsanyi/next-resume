import {
  client,
  ResumeCollectionDocument,
  type ResumeCollectionQuery,
} from '@/features/contentful';
import { validateResumeJSON } from './resume.util';

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
