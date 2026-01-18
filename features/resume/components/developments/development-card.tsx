import { Link } from '@/components/server';
import { FaGithub } from 'react-icons/fa6';
import { SiNetlify } from 'react-icons/si';
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
        <Link
          aria-label={`Visit ${development.name} on GitHub`}
          className="focus-visible:outline-primary print:text-foreground flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 print:mt-0.5 print:[&::after]:content-none"
          href={github}
          external
        >
          <FaGithub
            aria-hidden="true"
            className="text-foreground/70 print:text-foreground shrink-0"
            size={18}
          />
          <span>GitHub</span>
        </Link>
        <Link
          aria-label={`Visit ${development.name} live demo`}
          className="focus-visible:outline-primary print:text-foreground flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 print:mt-0.5 print:[&::after]:content-none"
          href={url}
          external
        >
          <SiNetlify
            aria-hidden="true"
            className="text-foreground/70 print:text-foreground shrink-0"
            size={18}
          />
          <span>Live Demo</span>
        </Link>
      </div>
    </article>
  );
};
