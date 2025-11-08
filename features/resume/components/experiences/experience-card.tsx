import { Link } from '@/components/server';
import type { Experience } from '../../resume.types';
import { formatPeriod } from '../../utils/date.util';
import { TechnologiesList } from '../technology/technologies-list';
import { PositionBadge } from './position-badge';
import { RecommendationCard } from './recommendation-card';

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
                <Link
                  href={company.website}
                  size="base"
                  weight="medium"
                >
                  {company.name}
                </Link>
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
          <p className="text-foreground/70 mt-2 pl-6 text-sm">
            {company.description}
          </p>
        )}
      </div>

      {/* Key Achievements */}
      {achievements.length > 0 && (
        <div className="mb-4">
          <h4 className="text-foreground/60 mb-2 text-sm font-semibold tracking-wide uppercase">
            Key Achievements
          </h4>
          <ul className="marker:text-foreground/10 list-outside list-disc space-y-2 pl-6 marker:text-xl">
            {achievements.map((achievement, index) => (
              <li
                key={index}
                className="text-foreground/80 text-sm"
              >
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Technologies */}
      <TechnologiesList
        className="mb-4"
        technologies={technologies}
        showTitle
      />

      {/* Recommendations */}
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
