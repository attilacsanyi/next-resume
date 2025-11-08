import type { Learning } from '../../resume.types';
import { formatDate } from '../../utils/date.util';

type LearningCardProps = {
  learning: Learning;
};

export const LearningCard = ({ learning }: LearningCardProps) => {
  return (
    <article className="border-foreground/10 bg-background rounded-lg border p-4 transition-shadow hover:shadow-md print:shadow-none print:hover:shadow-none">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold">{learning.title}</h3>
        <time
          className="text-foreground/60 text-xs"
          dateTime={learning.date}
        >
          {formatDate(learning.date)}
        </time>
      </div>
      {learning.percentage !== undefined && (
        <p className="text-foreground/70 mb-2 text-sm">
          Score: {learning.percentage}%
        </p>
      )}
      {learning.note && (
        <p className="text-foreground/60 mb-2 text-sm italic">
          {learning.note}
        </p>
      )}
      {learning.certificate && (
        <a
          className="text-foreground/80 hover:text-foreground mt-2 inline-block text-sm underline-offset-4 transition-colors hover:underline print:no-underline"
          href={learning.certificate}
          rel="noopener noreferrer"
          target="_blank"
        >
          View Certificate
        </a>
      )}
    </article>
  );
};
