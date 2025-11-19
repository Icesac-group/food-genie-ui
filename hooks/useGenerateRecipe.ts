// hooks/useGenerateRecipe.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

export function useGenerateRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ingredients: string[]) => 
      api.post('/recipes/generate', { ingredients }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
}