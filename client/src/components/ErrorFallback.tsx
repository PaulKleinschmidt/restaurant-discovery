import { useEffect } from 'react';

type TProps = {
  error: Error;
};

export const ErrorFallback = ({ error }: TProps) => {
  useEffect(() => {
    // Ideally I would log to an external error logging client here
    console.error(error.message);
  }, [error]);
  return (
    <div className="bg-gray h-screen" role="alert">
      <h1 className="text-center font-manrope pt-12">
        ⚠️ Something went wrong. Please refresh the page or try again later
      </h1>
    </div>
  );
};
