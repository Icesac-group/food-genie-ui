import { http } from "./http";

export function login(data: { email: string; password: string }) {
  return http("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function register(data: any) {
  return http("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
