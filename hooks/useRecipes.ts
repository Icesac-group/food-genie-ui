import { useMutation, useQueryClient } from '@tanstack/react-query';
import { recipeService, Recipe } from '@/lib/api/services';

export const useRecipes = () => {
  const queryClient = useQueryClient();

  return useMutation<{ recipe: Recipe }, Error, string[]>({
    mutationFn: (ingredients: string[]) => recipeService.generate(ingredients),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
  });
};
