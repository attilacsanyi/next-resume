import type { Development } from '../../resume.types';
import { SectionWrapper } from '../section-wrapper';
import { DevelopmentCard } from './development-card';

type DevelopmentsSectionProps = {
  developments: Development[];
};

export const DevelopmentsSection = ({
  developments,
}: DevelopmentsSectionProps) => {
  if (developments.length === 0) return null;

  return (
    <SectionWrapper
      columns={{ mobile: 1, tablet: 2, desktop: 3 }}
      title="Projects & Developments"
    >
      {developments.map((development, index) => (
        <DevelopmentCard
          key={index}
          development={development}
        />
      ))}
    </SectionWrapper>
  );
};
