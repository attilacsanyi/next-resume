import type { PositionType } from '../../resume.types';

type PositionBadgeProps = {
  type: PositionType;
};

export const PositionBadge = ({ type }: PositionBadgeProps) => {
  const styles = {
    remote: 'bg-blue-500/8 text-blue-600 dark:text-blue-300',
    'on-site': 'bg-green-500/8 text-green-600 dark:text-green-300',
  };

  return (
    <span
      className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${styles[type]}`}
    >
      {type === 'on-site' ? 'On-Site' : 'Remote'}
    </span>
  );
};
