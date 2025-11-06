import type { Recommendation } from '../../resume.types';

type RecommendationCardProps = {
  recommendation: Recommendation;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
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
      <ul className="mb-3 space-y-2">
        {recommendation.feedback.map((feedback, index) => (
          <li
            key={index}
            className="text-foreground/80 flex items-start gap-2 text-sm"
          >
            <span className="text-foreground/60 mt-1.5 shrink-0">•</span>
            <span>{feedback}</span>
          </li>
        ))}
      </ul>
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
