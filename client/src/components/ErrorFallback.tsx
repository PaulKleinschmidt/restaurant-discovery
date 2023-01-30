import { useEffect } from 'react';

type Props = {
  error: Error;
};

export const ErrorFallback = ({ error }: Props) => {
  useEffect(() => {
    // Ideally I would log to an external error logging client here
    console.error(error.message);
  }, [error]);
  return (
    <div role="alert">
      <p>⚠️ Something went wrong. Please try again later.</p>
    </div>
  );
};
