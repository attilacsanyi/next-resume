import Image from 'next/image';

const TailwindDemo = () => {
  return (
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
          <h2 className="text-3xl font-bold tracking-tight">Tailwind Demo</h2>
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
  );
};

export default TailwindDemo;
