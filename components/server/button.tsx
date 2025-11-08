import { cn } from '@/shared/utils/utils';
import { type ButtonVariants, buttonVariants } from './button.variants';

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant,
  size,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
};
