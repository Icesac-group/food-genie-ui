const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = {
  get: async (endpoint) => {
    const res = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return res.json();
  },
  post: async (endpoint, body) => {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return res.json();
  },
};

module.exports = api;
