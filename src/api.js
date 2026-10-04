const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:4000";

export async function post(path, body) {
  return fetch(`${API_BASE}/api${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}
