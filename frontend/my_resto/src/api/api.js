const BASE_URL = import.meta.env.VITE_API_URL

async function handleResponse(res) {
  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong")
  }

  return data
}

export async function get(url) {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: authHeader(),
  })
  return handleResponse(res)
}

export async function post(url, body) {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(body),
  })
  return handleResponse(res)
}

export async function put(url, body) {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify(body),
  })
  return handleResponse(res)
}

export async function del(url) {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: "DELETE",
    headers: authHeader(),
  })
  return handleResponse(res)
}

function authHeader() {
  const token = localStorage.getItem("token")
  return token ? { Authorization: `Bearer ${token}` } : {}
}
