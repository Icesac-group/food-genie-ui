const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function http<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const message = await res.text().catch(() => "Unknown error");
    throw new Error(`API Error (${res.status}): ${message}`);
  }

  return res.json();
}
