import { http } from "../api.ts/http";

export interface Meal {
  name: string;
  price: number;
  category: string;
  description: string;
  ingredients: string[];
  _id: string;
  availability: boolean;
  nutritionPerServing: string[];
  instructions: string[];
}

export async function getMeals(): Promise<Meal[]> {
  const data = await http("/meals");
  if (Array.isArray(data)) return data;
  if (data?.data && Array.isArray(data.data)) return data.data;
  if (data?.meals && Array.isArray(data.meals)) return data.meals;
  return [];
}

export async function getMealById(id: string): Promise<Meal> {
  const data = await http(`/meals/${id}`);
  if (data?._id) return data as Meal;
  if (data?.data?._id) return data.data as Meal;
  return data as Meal;
}
