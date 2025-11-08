import { cn } from '@/shared/utils/utils';
import { type LinkVariants, linkVariants } from './link.variants';

type LinkProps = {
  children: React.ReactNode;
  href: string;
  size?: LinkVariants['size'];
  weight?: LinkVariants['weight'];
  className?: string;
  external?: boolean;
} & Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'target' | 'rel'
>;

export const Link = ({
  children,
  href,
  size,
  weight,
  className,
  external = true,
  ...props
}: LinkProps) => {
  return (
    <a
      className={cn(linkVariants({ size, weight }), className)}
      href={href}
      rel={external ? 'noopener noreferrer' : undefined}
      target={external ? '_blank' : undefined}
      {...props}
    >
      {children}
    </a>
  );
};
