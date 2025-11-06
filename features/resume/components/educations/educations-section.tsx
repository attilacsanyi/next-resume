import type { Education } from '../../resume.types';
import { SectionWrapper } from '../section-wrapper';
import { EducationCard } from './education-card';

type EducationsSectionProps = {
  educations: Education[];
};

export const EducationsSection = ({ educations }: EducationsSectionProps) => {
  if (educations.length === 0) return null;

  return (
    <SectionWrapper
      columns={{ mobile: 1, tablet: 2, desktop: 2 }}
      title="Education"
    >
      {educations.map((education, index) => (
        <EducationCard
          key={index}
          education={education}
        />
      ))}
    </SectionWrapper>
  );
};
