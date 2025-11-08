type SectionWrapperProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    xl?: number;
  };
};

const getGridCols = (columns: {
  mobile?: number;
  tablet?: number;
  desktop?: number;
  xl?: number;
}): string => {
  const mobile = columns.mobile ?? 1;
  const tablet = columns.tablet ?? 2;
  const desktop = columns.desktop ?? 3;
  const xl = columns.xl ?? 4;

  // Explicit class mappings to ensure Tailwind detects them
  const mobileClass =
    {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
    }[mobile] ?? 'grid-cols-1';

  const tabletClass =
    {
      1: 'md:grid-cols-1',
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-3',
      4: 'md:grid-cols-4',
    }[tablet] ?? 'md:grid-cols-2';

  const desktopClass =
    {
      1: 'lg:grid-cols-1',
      2: 'lg:grid-cols-2',
      3: 'lg:grid-cols-3',
      4: 'lg:grid-cols-4',
    }[desktop] ?? 'lg:grid-cols-3';

  const xlClass =
    {
      1: 'xl:grid-cols-1',
      2: 'xl:grid-cols-2',
      3: 'xl:grid-cols-3',
      4: 'xl:grid-cols-4',
    }[xl] ?? 'xl:grid-cols-4';

  return `${mobileClass} ${tabletClass} ${desktopClass} ${xlClass}`;
};

export const SectionWrapper = ({
  title,
  subtitle,
  children,
  columns = { mobile: 1, tablet: 2, desktop: 3, xl: 4 },
}: SectionWrapperProps) => {
  return (
    <section className="mb-12">
      {subtitle ? (
        <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <small className="text-muted-foreground text-base font-normal">
            {subtitle}
          </small>
        </header>
      ) : (
        <h2 className="mb-6 text-2xl font-semibold">{title}</h2>
      )}
      <div className={`grid gap-6 ${getGridCols(columns)}`}>{children}</div>
    </section>
  );
};
