import type { Recommendation } from '../../resume.types';
import { formatDate } from '../../utils/date.util';

type RecommendationCardProps = {
  recommendation: Recommendation;
};

export const RecommendationCard = ({
  recommendation,
}: RecommendationCardProps) => {
  return (
    <article className="border-foreground/10 bg-foreground/2 rounded-lg border p-4">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <h4 className="text-base font-semibold">{recommendation.name}</h4>
          <p className="text-foreground/70 mt-1 text-sm">
            {recommendation.title}
          </p>
        </div>
        <time
          className="text-foreground/60 text-xs"
          dateTime={recommendation.date}
        >
          {formatDate(recommendation.date)}
        </time>
      </div>
      <blockquote className="border-primary text-foreground/80 border-l-foreground/10 border-l-4 pl-4 italic">
        <ul className="mb-3 list-outside list-none space-y-2">
          {recommendation.feedback.map((feedback, index) => (
            <li
              key={index}
              className="text-foreground/80 text-sm"
            >
              {feedback}
            </li>
          ))}
        </ul>
      </blockquote>
      <a
        className="text-foreground/80 hover:text-foreground text-sm underline-offset-4 transition-colors hover:underline print:no-underline"
        href={recommendation.profile.url}
        rel="noopener noreferrer"
        target="_blank"
      >
        View on LinkedIn
      </a>
    </article>
  );
};
