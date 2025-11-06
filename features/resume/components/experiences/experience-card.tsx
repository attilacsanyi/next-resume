import type { Experience, Technology, TechType } from '../../resume.types';
import { PositionBadge } from './position-badge';
import { RecommendationCard } from './recommendation-card';
import { TechnologyTag } from './technology-tag';

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
};

const formatPeriod = (start: string, end?: string): string => {
  const startFormatted = formatDate(start);
  const endFormatted = end ? formatDate(end) : 'Present';
  return `${startFormatted} - ${endFormatted}`;
};

const technologyTypeOrder: Record<TechType, number> = {
  skill: 0,
  lib: 1,
  tool: 2,
};

const sortTechnologiesByType = (technologies: Technology[]): Technology[] => {
  return [...technologies].sort((a, b) => {
    const typeDiff = technologyTypeOrder[a.type] - technologyTypeOrder[b.type];
    if (typeDiff !== 0) return typeDiff;

    // Featured ones come first within the same type
    if (a.featured === b.featured) {
      return a.name.localeCompare(b.name);
    }
    return a.featured ? -1 : 1;
  });
};

type ExperienceCardProps = {
  experience: Experience;
};

export const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  const { company, position, achievements, technologies, recommendations } =
    experience;

  return (
    <article className="border-foreground/10 bg-background rounded-lg border p-6">
      <div className="mb-4">
        <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold">{position.title}</h3>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              {company.website ? (
                <a
                  className="text-foreground/80 hover:text-foreground text-base font-medium underline-offset-4 transition-colors hover:underline print:no-underline"
                  href={company.website}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {company.name}
                </a>
              ) : (
                <span className="text-base font-medium">{company.name}</span>
              )}
              <PositionBadge type={position.type} />
            </div>
            {(company.location?.city || company.location?.country) && (
              <p className="text-foreground/60 mt-1 text-sm">
                {[company.location?.city, company.location?.country]
                  .filter(Boolean)
                  .join(', ')}
              </p>
            )}
          </div>
          <time
            className="text-foreground/60 text-xs"
            dateTime={`${position.dates.start}/${position.dates.end ?? ''}`}
          >
            {formatPeriod(position.dates.start, position.dates.end)}
          </time>
        </div>
        {company.description && (
          <p className="text-foreground/70 mt-2 text-sm">
            {company.description}
          </p>
        )}
      </div>

      {achievements.length > 0 && (
        <div className="mb-4">
          <h4 className="text-foreground/60 mb-2 text-sm font-semibold tracking-wide uppercase">
            Key Achievements
          </h4>
          <ul className="space-y-2">
            {achievements.map((achievement, index) => (
              <li
                key={index}
                className="text-foreground/80 flex items-start gap-2 text-sm"
              >
                <span className="text-foreground/60 mt-1.5 shrink-0">•</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {technologies.length > 0 && (
        <div className="mb-4">
          <h4 className="text-foreground/60 mb-2 text-sm font-semibold tracking-wide uppercase">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {sortTechnologiesByType(technologies).map((technology, index) => (
              <TechnologyTag
                key={index}
                technology={technology}
              />
            ))}
          </div>
        </div>
      )}

      {recommendations && recommendations.length > 0 && (
        <div className="mt-4">
          <h4 className="text-foreground/60 mb-3 text-sm font-semibold tracking-wide uppercase">
            Recommendations
          </h4>
          <div className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <RecommendationCard
                key={index}
                recommendation={recommendation}
              />
            ))}
          </div>
        </div>
      )}
    </article>
  );
};
