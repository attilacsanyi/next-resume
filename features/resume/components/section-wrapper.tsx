type SectionWrapperProps = {
  title: string;
  children: React.ReactNode;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
};

const getGridCols = (columns: {
  mobile?: number;
  tablet?: number;
  desktop?: number;
}): string => {
  const mobile = columns.mobile ?? 1;
  const tablet = columns.tablet ?? 2;
  const desktop = columns.desktop ?? 3;

  const gridMap: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
  };

  return `${gridMap[mobile] ?? 'grid-cols-1'} md:${gridMap[tablet] ?? 'grid-cols-2'} lg:${gridMap[desktop] ?? 'grid-cols-3'}`;
};

export const SectionWrapper = ({
  title,
  children,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
}: SectionWrapperProps) => {
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-semibold">{title}</h2>
      <div className={`grid gap-6 ${getGridCols(columns)}`}>{children}</div>
    </section>
  );
};
