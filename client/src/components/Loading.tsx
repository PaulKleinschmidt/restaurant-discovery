export const Loading = () => {
  return (
    <div className="bg-gray h-screen text-center pt-24 " role="alert">
      <div className="w-10 h-10 rounded-full animate-spin border-2 border-solid border-green border-t-transparent mx-auto" />
      <div className="mt-6 text-lg text-textPrimary font-semibold">
        Loading...
      </div>
    </div>
  );
};
