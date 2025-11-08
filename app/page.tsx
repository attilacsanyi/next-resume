import { env } from '@/env';
import {
  DevelopmentsSection,
  EducationsSection,
  ExperiencesSection,
  LearningsSection,
  ProfileSection,
  getResume,
  parseRecentYears,
} from '@/features/resume';

/**
 * Revalidate the page every 5 minutes
 */
export const revalidate = 300;

type HomeProps = {
  searchParams: Promise<{ recentYears?: string }>;
};

const Home = async ({ searchParams }: HomeProps) => {
  const isDev = env.NODE_ENV !== 'production';
  const params = await searchParams;

  const recentYears = parseRecentYears(params.recentYears);

  const { profile, experiences, learnings, developments, educations } =
    await getResume(isDev);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* <TailwindDemo /> */}
        <ProfileSection profile={profile} />
        <ExperiencesSection
          experiences={experiences}
          recentYears={recentYears}
        />
        <LearningsSection
          learnings={learnings}
          recentYears={recentYears}
        />
        <DevelopmentsSection
          developments={developments}
          recentYears={recentYears}
        />
        <EducationsSection educations={educations} />
      </div>
    </main>
  );
};

export default Home;
