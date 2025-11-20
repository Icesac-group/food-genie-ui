import { useQuery } from '@tanstack/react-query';
import { recipeService, Recipe } from '@/lib/api/services';

export const useAllRecipes = () => {
  return useQuery<Recipe[], Error>({
    queryKey: ['recipes'],
    queryFn: recipeService.getAll,
  });
};
