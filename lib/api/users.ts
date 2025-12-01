import { http } from "./http";

// GET /users
export function getUsers() {
  return http("/users");
}

// GET /users/:id
export function getUser(id: string) {
  return http(`/users/${id}`);
}
