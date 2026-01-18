import { Link } from '@/components/server';
import { FaCertificate } from 'react-icons/fa6';
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
        <Link
          aria-label={`View certificate for ${learning.title}`}
          className="focus-visible:outline-primary print:text-foreground flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 print:mt-0.5 print:[&::after]:content-none"
          href={learning.certificate}
          external
        >
          <FaCertificate
            aria-hidden="true"
            className="text-foreground/70 print:text-foreground shrink-0"
            size={18}
          />
          <span>Certificate</span>
        </Link>
      )}
    </article>
  );
};
