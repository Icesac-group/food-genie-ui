'use client';

import { useRecipes } from '@/hooks/useRecipes';

export default function ApiTest() {
  const { data, isLoading, isError, error } = useRecipes();

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>API Connected!</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
