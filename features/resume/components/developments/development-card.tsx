import type { Development } from '../../resume.types';

type DevelopmentCardProps = {
  development: Development;
};

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

export const DevelopmentCard = ({ development }: DevelopmentCardProps) => {
  return (
    <article className="border-foreground/10 bg-background flex flex-col rounded-lg border p-4 transition-shadow hover:shadow-md print:shadow-none print:hover:shadow-none">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold">{development.name}</h3>
        <time
          className="text-foreground/60 text-xs"
          dateTime={`${development.dates.start}/${development.dates.end ?? ''}`}
        >
          {formatPeriod(development.dates.start, development.dates.end)}
        </time>
      </div>
      <p className="text-foreground/80 mb-3 grow text-sm">
        {development.description}
      </p>
      {development.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {development.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-foreground/5 text-foreground/70 rounded-md px-2 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {development.github || development.url ? (
        <div className="flex flex-wrap gap-3">
          {development.github && (
            <a
              className="text-foreground/80 hover:text-foreground text-sm underline-offset-4 transition-colors hover:underline print:no-underline"
              href={development.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          )}
          {development.url && (
            <a
              className="text-foreground/80 hover:text-foreground text-sm underline-offset-4 transition-colors hover:underline print:no-underline"
              href={development.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              Live Demo
            </a>
          )}
        </div>
      ) : null}
    </article>
  );
};
