import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { recipeService, Recipe } from '@/lib/api/services';

export const useRecipes = () =>
  useQuery<Recipe[], Error>({
    queryKey: ['recipes'],
    queryFn: recipeService.getAll,
  });

export const useGenerateRecipe = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (ingredients: string[]) => recipeService.generate(ingredients),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['recipes'] }),
  });
};
