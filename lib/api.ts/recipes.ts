import { http } from "./http";

// GET /recipes
export function getRecipes() {
  return http("/recipes");
}

// GET /recipes/:id
export function getRecipe(id: string) {
  return http(`/recipes/${id}`);
}

// POST /recipes
export function createRecipe(data: any) {
  return http("/recipes", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
