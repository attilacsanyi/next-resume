export const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="rounded-lg bg-linear-to-r from-blue-500 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-xs hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-hidden">
      {children}
    </button>
  );
};
