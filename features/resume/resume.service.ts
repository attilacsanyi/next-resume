import {
  client,
  ResumeCollectionDocument,
  type ResumeCollectionQuery,
} from '@/features/contentful';
import { validateResumeJSON } from './utils/resume.util';

export const getResume = async (preview = false) => {
  const { data } = await client.query<ResumeCollectionQuery>({
    query: ResumeCollectionDocument,
    variables: { isPreview: preview },
  });

  const activeResumeItem = data.resumeCollection?.items.find(
    item => item.isActive
  );
  const validatedResume = activeResumeItem
    ? validateResumeJSON(activeResumeItem.json)
    : undefined;

  return validatedResume;
};
