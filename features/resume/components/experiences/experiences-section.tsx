import type { Experience } from '../../resume.types';
import { ExperienceCard } from './experience-card';

type ExperiencesSectionProps = {
  experiences: Experience[];
};

export const ExperiencesSection = ({
  experiences,
}: ExperiencesSectionProps) => {
  if (experiences.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-semibold">Professional Experience</h2>
      <div className="space-y-6">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={index}
            experience={experience}
          />
        ))}
      </div>
    </section>
  );
};
