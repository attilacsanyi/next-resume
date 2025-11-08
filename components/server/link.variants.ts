import { cva, type VariantProps } from 'class-variance-authority';

export const linkVariants = cva(
  'text-foreground/80 hover:text-foreground underline-offset-4 transition-colors hover:underline print:no-underline',
  {
    variants: {
      size: {
        sm: 'text-sm',
        base: 'text-base',
      },
      weight: {
        normal: '',
        medium: 'font-medium',
      },
    },
    defaultVariants: {
      size: 'sm',
      weight: 'normal',
    },
  }
);

export type LinkVariants = VariantProps<typeof linkVariants>;
