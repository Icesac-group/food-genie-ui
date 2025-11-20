// lib/api/services.ts
import { apiHelper } from './apiHelper';
export interface Recipe { id: string; name: string; ingredients: string[]; instructions: string; image?: string; }
export const recipeService = {
  getAll: () => apiHelper.get<Recipe[]>('/recipes'),
  getById: (id: string) => apiHelper.get<Recipe>(`/recipes/${id}`),
  generate: (ingredients: string[]) => apiHelper.post<{ recipe: Recipe }>('/recipes/generate', { ingredients }),
};
