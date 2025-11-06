import { env } from '@/env';
import {
  DevelopmentsSection,
  EducationsSection,
  ExperiencesSection,
  LearningsSection,
  ProfileSection,
  getResume,
} from '@/features/resume';

export const revalidate = 300;

const Home = async () => {
  const isDev = env.NODE_ENV !== 'production';
  const { profile, experiences, learnings, developments, educations } =
    await getResume(isDev);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* <TailwindDemo /> */}
        <ProfileSection profile={profile} />
        <ExperiencesSection experiences={experiences} />
        <LearningsSection learnings={learnings} />
        <DevelopmentsSection developments={developments} />
        <EducationsSection educations={educations} />
      </div>
    </main>
  );
};

export default Home;
