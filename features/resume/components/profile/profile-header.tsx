import type { Location } from '../../resume.types';

type ProfileHeaderProps = {
  name: string;
  headline: string;
  location: Location;
};

export const ProfileHeader = ({
  name,
  headline,
  location,
}: ProfileHeaderProps) => {
  const locationParts = [
    location.city,
    location.region,
    location.country,
    location.continent,
  ].filter(Boolean);

  return (
    <header className="mb-6">
      <h1 className="mb-2 text-4xl font-bold">{name}</h1>
      <p className="text-foreground/80 mb-3 text-xl">{headline}</p>
      {locationParts.length > 0 && (
        <p className="text-foreground/60 text-sm">{locationParts.join(', ')}</p>
      )}
    </header>
  );
};
