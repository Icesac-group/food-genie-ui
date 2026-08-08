const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

function getUrl(endpoint: string): string {
  // Browser: route through Next.js proxy to avoid CORS
  // Server (SSR): call the API directly
  if (typeof window === "undefined") {
    return `${BASE_URL}${endpoint}`;
  }
  return `/api/proxy${endpoint}`;
}

export async function http<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = getUrl(endpoint);

  const res = await fetch(url, {
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
