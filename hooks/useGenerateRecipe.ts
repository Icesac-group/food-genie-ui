import { useMutation, useQueryClient } from "@tanstack/react-query";
import { recipeService, Recipe } from "@/lib/api/services";

export const useGenerateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { recipe: Recipe },      // success type
    Error,                   // error type
    string[]                 // variables (ingredients)
  >({
    mutationFn: (ingredients) => recipeService.generate(ingredients),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recipes"],
      });
    },
  });
};
