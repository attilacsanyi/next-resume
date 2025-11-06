import type { Profile } from '../../resume.types';
import { ProfileHeader } from './profile-header';
import { SocialLinks } from './social-links';

type ProfileSectionProps = {
  profile: Profile;
};

export const ProfileSection = ({ profile }: ProfileSectionProps) => {
  return (
    <section className="mb-12">
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="mb-6 lg:mb-0">
          <ProfileHeader
            headline={profile.headline}
            location={profile.location}
            name={profile.name}
          />

          <SocialLinks socials={profile.socials} />

          {/* Profile languages */}
          {profile.languages.length > 0 && (
            <div className="mt-6">
              <h3 className="text-foreground/60 mb-2 text-sm font-semibold tracking-wide uppercase">
                Languages
              </h3>
              <p className="text-foreground/80 text-sm">
                {profile.languages.join(', ')}
              </p>
            </div>
          )}

          {/* Profile quote */}
          <div className="mt-8">
            <blockquote className="border-primary text-foreground/80 border-l-4 pl-4 italic">
              “{profile.quote.text}”
            </blockquote>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-foreground/60 text-sm font-medium">
                — {profile.quote.by}
              </span>
            </div>
          </div>

        </div>
        <div className="lg:col-span-2">
          <h2 className="mb-6 text-2xl font-semibold">Summary</h2>
          <div className="space-y-4">
            {profile.summary.map((paragraph, index) => (
              <p
                key={index}
                className="text-foreground/80 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
