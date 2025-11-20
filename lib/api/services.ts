import { apiHelper } from './apiHelper';

export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  image?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export const recipeService = {
  getAll: () => apiHelper.get<Recipe[]>('/recipes'),
  getById: (id: string) => apiHelper.get<Recipe>(`/recipes/${id}`),
  create: (data: Omit<Recipe, 'id'>) => apiHelper.post<Recipe>('/recipes', data),
  generate: (ingredients: string[]) =>
    apiHelper.post<{ recipe: Recipe }>('/recipes/generate', { ingredients }),
  update: (id: string, data: Partial<Recipe>) => apiHelper.put<Recipe>(`/recipes/${id}`, data),
  delete: (id: string) => apiHelper.delete(`/recipes/${id}`),
};

export const userService = {
  getProfile: () => apiHelper.get<User>('/users/profile'),
  updateProfile: (data: Partial<User>) => apiHelper.put<User>('/users/profile', data),
};
