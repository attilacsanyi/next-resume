import { SectionWrapper } from '@/features/resume/components/section-wrapper';
import type { Learning } from '../../resume.types';
import { prepareSectionData } from '../../utils/section.util';
import { LearningCard } from './learning-card';

type LearningsSectionProps = {
  learnings: Learning[];
  recentYears: number;
};

export const LearningsSection = ({
  learnings,
  recentYears,
}: LearningsSectionProps) => {
  const sectionData = prepareSectionData(
    learnings,
    recentYears,
    learning => new Date(learning.date),
    learning => new Date(learning.date)
  );

  if (!sectionData) return null;

  const { filteredItems: filteredLearnings, subtitle } = sectionData;
  const itemCount = filteredLearnings.length;

  return (
    <SectionWrapper
      columns={{
        mobile: 1,
        tablet: itemCount >= 2 ? 2 : itemCount,
        desktop: itemCount >= 2 ? 2 : itemCount,
        xl: itemCount >= 4 ? 4 : itemCount,
      }}
      subtitle={subtitle}
      title="Certifications & Learnings"
    >
      {filteredLearnings.map((learning, index) => (
        <LearningCard
          key={index}
          learning={learning}
        />
      ))}
    </SectionWrapper>
  );
};
