import type { Education } from '../../resume.types';

type EducationCardProps = {
  education: Education;
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

export const EducationCard = ({ education }: EducationCardProps) => {
  return (
    <article className="border-foreground/10 bg-background rounded-lg border p-4 transition-shadow hover:shadow-md print:shadow-none print:hover:shadow-none">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold">{education.institution}</h3>
          {education.degree && (
            <p className="text-foreground/70 mt-1 text-sm">
              {education.degree}
            </p>
          )}
        </div>
        <time
          className="text-foreground/60 text-xs"
          dateTime={`${education.dates.start}/${education.dates.end ?? ''}`}
        >
          {formatPeriod(education.dates.start, education.dates.end)}
        </time>
      </div>
    </article>
  );
};
