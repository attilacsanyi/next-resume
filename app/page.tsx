import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <Link
          className="cursor-pointer"
          href="/api/export"
        >
          <span className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Download as PDF
          </span>
        </Link>
        <Image
          alt="Next.js logo"
          className="dark:invert"
          height={38}
          src="/next.svg"
          width={180}
          priority
        />
        <ol className="list-inside list-decimal text-center font-[family-name:var(--font-geist-mono)] text-sm sm:text-left">
          <li className="mb-2">
            Get started by editing{' '}
            <code className="rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex flex-col gap-8 rounded-3xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-8 shadow-2xl">
          <div className="flex flex-col items-center gap-6 rounded-2xl bg-white/10 p-6 backdrop-blur-sm md:flex-row md:gap-8">
            <div className="transform transition-transform hover:scale-105">
              <Image
                alt="Demo image"
                className="rounded-lg border-4 border-white/20 shadow-xl"
                height={192}
                src="/vercel.svg"
                width={192}
              />
            </div>
            <div className="flex flex-col gap-4 text-white">
              <h2 className="text-3xl font-bold tracking-tight">
                Tailwind Demo
              </h2>
              <p className="max-w-md text-lg font-medium text-white/80">
                A showcase of various Tailwind CSS styles including gradients,
                shadows, and animations
              </p>
              <div className="flex items-center gap-4">
                <span className="rounded-full bg-white/20 px-4 py-1 text-sm font-semibold">
                  Gradient
                </span>
                <span className="rounded-full bg-white/20 px-4 py-1 text-sm font-semibold">
                  Glassmorphism
                </span>
                <span className="rounded-full bg-white/20 px-4 py-1 text-sm font-semibold">
                  Hover Effects
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <a
            className="flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent bg-foreground px-4 text-sm text-background transition-colors hover:bg-[#383838] sm:h-12 sm:px-5 sm:text-base dark:hover:bg-[#ccc]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              alt="Vercel logomark"
              className="dark:invert"
              height={20}
              src="/vercel.svg"
              width={20}
            />
            Deploy now
          </a>
          <a
            className="flex h-10 items-center justify-center rounded-full border border-solid border-black/[.08] px-4 text-sm transition-colors hover:border-transparent hover:bg-[#f2f2f2] sm:h-12 sm:min-w-44 sm:px-5 sm:text-base dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            rel="noopener noreferrer"
            target="_blank"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            alt="File icon"
            height={16}
            src="/file.svg"
            width={16}
            aria-hidden
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            alt="Window icon"
            height={16}
            src="/window.svg"
            width={16}
            aria-hidden
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            alt="Globe icon"
            height={16}
            src="/globe.svg"
            width={16}
            aria-hidden
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
