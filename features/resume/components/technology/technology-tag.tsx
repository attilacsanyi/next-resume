import type { Technology, TechType } from '../../resume.types';

type TechnologyTagProps = {
  technology: Technology;
};

const typeStyleMap: Record<TechType, { base: string; featuredRing: string }> = {
  skill: {
    base: 'bg-purple-500/8 text-purple-600 dark:text-purple-300',
    featuredRing: 'ring-purple-300/50 ring-1',
  },
  lib: {
    base: 'bg-pink-500/8 text-pink-600 dark:text-pink-300',
    featuredRing: 'ring-pink-300/50 ring-1',
  },
  tool: {
    base: 'bg-orange-500/8 text-orange-600 dark:text-orange-300',
    featuredRing: 'ring-orange-300/50 ring-1',
  },
};

export const TechnologyTag = ({ technology }: TechnologyTagProps) => {
  const { base, featuredRing } = typeStyleMap[technology.type];
  const className = [
    'inline-block rounded-md px-2 py-1 text-xs font-medium',
    base,
    technology.featured ? featuredRing : '',
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={className}>{technology.name}</span>;
};
