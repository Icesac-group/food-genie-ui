import { http } from "./http";

// GET /categories
export function getCategories() {
  return http("/categories");
}

// POST /categories
export function createCategory(data: any) {
  return http("/categories", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
