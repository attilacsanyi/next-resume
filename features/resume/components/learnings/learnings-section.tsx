import type { Learning } from '../../resume.types';
import { SectionWrapper } from '../section-wrapper';
import { LearningCard } from './learning-card';

type LearningsSectionProps = {
  learnings: Learning[];
};

export const LearningsSection = ({ learnings }: LearningsSectionProps) => {
  if (learnings.length === 0) return null;

  return (
    <SectionWrapper
      columns={{ mobile: 1, tablet: 2, desktop: 3 }}
      title="Certifications & Learnings"
    >
      {learnings.map((learning, index) => (
        <LearningCard
          key={index}
          learning={learning}
        />
      ))}
    </SectionWrapper>
  );
};
