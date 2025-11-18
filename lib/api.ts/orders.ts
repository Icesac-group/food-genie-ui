import { http } from "./http";

// GET /orders
export function getOrders() {
  return http("/orders");
}

// GET /orders/:id
export function getOrder(id: string) {
  return http(`/orders/${id}`);
}

// POST /orders
export function createOrder(data: any) {
  return http("/orders/generate", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
