import { Link } from '@/components/server';
import { FaArrowsRotate, FaFileCircleXmark } from 'react-icons/fa6';

export const NotFound = () => {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 text-center">
          <h1 className="text-foreground flex items-center justify-center gap-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            <FaFileCircleXmark /> Resume not available
          </h1>
          <p className="text-muted-foreground mt-4">
            No active resume is currently available in Contentful. The resume
            content may be unpublished, or no resume is marked as active.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              className="focus-visible:outline-primary print:text-foreground flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 print:mt-0.5 print:[&::after]:content-none"
              external={false}
              href="/"
              size="base"
              weight="medium"
            >
              <FaArrowsRotate
                aria-hidden="true"
                className="text-foreground/70 print:text-foreground shrink-0"
                size={18}
              />
              <h4>Refresh the page</h4>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
