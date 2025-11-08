import type { Technology } from '../../resume.types';
import { sortTechnologiesByType } from '../../utils/technology.util';
import { TechnologyTag } from './technology-tag';

type TechnologiesListProps = {
  technologies: Technology[];
  className?: string;
  showTitle?: boolean;
};

/**
 * Reusable component for displaying a list of technologies.
 * Automatically sorts technologies by type and featured status.
 */
export const TechnologiesList = ({
  technologies,
  className = '',
  showTitle = false,
}: TechnologiesListProps) => {
  if (technologies.length === 0) return null;

  return (
    <div className={className}>
      {showTitle && (
        <h4 className="text-foreground/60 mb-2 text-sm font-semibold tracking-wide uppercase">
          Technologies
        </h4>
      )}
      <div className={`flex flex-wrap gap-2 ${showTitle ? 'pl-6' : ''}`}>
        {sortTechnologiesByType(technologies).map((technology, index) => (
          <TechnologyTag
            key={index}
            technology={technology}
          />
        ))}
      </div>
    </div>
  );
};
