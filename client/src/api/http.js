const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

function getAuthHeaders() {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return {};
  }
  return { Authorization: `Bearer ${token}` };
}

async function parseJson(response) {
  const text = await response.text();
  if (!text) {
    return null;
  }
  return JSON.parse(text);
}

export async function apiGet(path) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      ...getAuthHeaders()
    }
  });
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }
  return parseJson(response);
}

export async function apiPost(path, body) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders()
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return parseJson(response);
}
