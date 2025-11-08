import { SectionWrapper } from '@/features/resume/components/section-wrapper';
import type { Experience } from '../../resume.types';
import { prepareSectionData } from '../../section.util';
import { ExperienceCard } from './experience-card';

type ExperiencesSectionProps = {
  experiences: Experience[];
  recentYears: number;
};

export const ExperiencesSection = ({
  experiences,
  recentYears,
}: ExperiencesSectionProps) => {
  const sectionData = prepareSectionData(
    experiences,
    recentYears,
    experience => new Date(experience.position.dates.start),
    experience =>
      experience.position.dates.end
        ? new Date(experience.position.dates.end)
        : new Date()
  );

  if (!sectionData) return null;

  const { filteredItems: filteredExperiences, subtitle } = sectionData;
  const itemCount = filteredExperiences.length;

  return (
    <SectionWrapper
      columns={{
        mobile: 1,
        tablet: 1,
        desktop: itemCount >= 2 ? 2 : itemCount,
      }}
      subtitle={subtitle}
      title="Professional Experience"
    >
      {filteredExperiences.map((experience, index) => (
        <ExperienceCard
          key={index}
          experience={experience}
        />
      ))}
    </SectionWrapper>
  );
};
