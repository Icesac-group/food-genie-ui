// lib/api/apiHelper.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;
export class ApiHelper {
  constructor(private baseUrl: string) {}
  private async request<T>(endpoint: string, method = 'GET', body?: any): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as any).message || `HTTP ${res.status}`);
    }
    if (res.status === 204) return {} as T;
    return res.json();
  }
  get<T>(endpoint: string) { return this.request<T>(endpoint, 'GET'); }
  post<T>(endpoint: string, body: any) { return this.request<T>(endpoint, 'POST', body); }
  // ... you can add put, delete as needed
}
export const apiHelper = new ApiHelper(API_BASE_URL);