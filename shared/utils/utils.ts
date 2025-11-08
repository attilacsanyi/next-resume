import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const assertUnreachable = (_caseValue: never): never => {
  throw new Error('Unhandled switch case');
};
