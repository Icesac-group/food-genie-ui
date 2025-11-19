// hooks/useRecipes.ts
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export function useRecipes() {
  return useQuery({
    queryKey: ['recipes'],
    queryFn: () => api.get('/recipes'),
  });
}