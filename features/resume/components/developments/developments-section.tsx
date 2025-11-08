import { SectionWrapper } from '@/features/resume/components/section-wrapper';
import type { Development } from '../../resume.types';
import { prepareSectionData } from '../../utils/section.util';
import { DevelopmentCard } from './development-card';

type DevelopmentsSectionProps = {
  developments: Development[];
  recentYears: number;
};

export const DevelopmentsSection = ({
  developments,
  recentYears,
}: DevelopmentsSectionProps) => {
  const sectionData = prepareSectionData(
    developments,
    recentYears,
    development => new Date(development.dates.start),
    development =>
      development.dates.end ? new Date(development.dates.end) : new Date()
  );

  if (!sectionData) return null;

  const { filteredItems: filteredDevelopments, subtitle } = sectionData;
  const itemCount = filteredDevelopments.length;

  return (
    <SectionWrapper
      columns={{
        mobile: 1,
        tablet: itemCount >= 2 ? 2 : itemCount,
        desktop: itemCount >= 4 ? 4 : itemCount,
      }}
      subtitle={subtitle}
      title="Projects & Developments"
    >
      {filteredDevelopments.map((development, index) => (
        <DevelopmentCard
          key={index}
          development={development}
        />
      ))}
    </SectionWrapper>
  );
};
