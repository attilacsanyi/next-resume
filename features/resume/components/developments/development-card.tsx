import { Link } from '@/components/server';
import type { Development } from '../../resume.types';
import { formatPeriod } from '../../utils/date.util';
import { TechnologiesList } from '../technology/technologies-list';

type DevelopmentCardProps = {
  development: Development;
};

export const DevelopmentCard = ({ development }: DevelopmentCardProps) => {
  const { technologies, github, url } = development;

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

      {/* Technologies */}
      <TechnologiesList
        className="mb-4"
        technologies={technologies}
      />
      <div className="flex flex-wrap gap-3">
        <Link href={github}>GitHub</Link>
        <Link href={url}>Live Demo</Link>
      </div>
    </article>
  );
};
