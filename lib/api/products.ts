import { http } from "./http";

// GET /products
export function getProducts() {
  return http("/products");
}

// GET /products/:id
export function getProduct(id: string) {
  return http(`/products/${id}`);
}

// POST /products
export function createProduct(data: any) {
  return http("/products", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// PUT /products/:id
export function updateProduct(id: string, data: any) {
  return http(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// DELETE /products/:id
export function deleteProduct(id: string) {
  return http(`/products/${id}`, {
    method: "DELETE",
  });
}
