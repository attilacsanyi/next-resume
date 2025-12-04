import { Link } from '@/components/server';
import {
  FaEnvelope,
  FaLinkedin,
  FaSquareGithub,
  FaSquareXTwitter,
} from 'react-icons/fa6';
import type { Socials } from '../../resume.types';

type SocialLinksProps = {
  socials: Socials;
};

type SocialLink = {
  label: string;
  ariaLabel: string;
  url: string;
  icon: React.ElementType;
  external: boolean;
};

export const SocialLinks = ({ socials }: SocialLinksProps) => {
  const iconSize = 24;
  const links: SocialLink[] = [
    {
      label: 'Email',
      ariaLabel: `Send email to ${socials.email}`,
      url: `mailto:${socials.email}`,
      icon: FaEnvelope,
      external: false,
    },
    {
      label: 'LinkedIn',
      ariaLabel: 'Visit LinkedIn profile',
      url: socials.linkedin,
      icon: FaLinkedin,
      external: true,
    },
    {
      label: 'GitHub',
      ariaLabel: 'Visit GitHub profile',
      url: socials.github,
      icon: FaSquareGithub,
      external: true,
    },
    {
      label: 'X/Twitter',
      ariaLabel: 'Visit X (Twitter) profile',
      url: socials.twitter,
      icon: FaSquareXTwitter,
      external: true,
    },
  ];

  return (
    <nav aria-label="Social links">
      <ul className="flex list-none flex-wrap gap-4">
        {links.map(link => {
          const Icon = link.icon;
          return (
            <li key={link.label}>
              <Link
                aria-label={link.ariaLabel}
                className="focus-visible:outline-primary flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2"
                external={link.external}
                href={link.url}
              >
                <Icon
                  aria-hidden="true"
                  className="shrink-0"
                  size={iconSize}
                />
                <span>{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
