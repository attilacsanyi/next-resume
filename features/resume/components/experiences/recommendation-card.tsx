import { Link } from '@/components/server';
import { FaLinkedin } from 'react-icons/fa6';
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
        <div className="flex-1">
          <div className="flex items-center gap-2 print:flex-col print:items-start">
            <h4 className="text-base font-semibold">{recommendation.name}</h4>
            <Link
              aria-label={`Visit ${recommendation.name}'s LinkedIn profile`}
              className="focus-visible:outline-primary print:text-foreground flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 print:mt-0.5 print:[&::after]:content-none"
              href={recommendation.profile.url}
              external
            >
              <FaLinkedin
                aria-hidden="true"
                className="text-foreground/70 print:text-foreground shrink-0"
                size={18}
              />
            </Link>
          </div>
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
    </article>
  );
};
