import { clear_localstorage, get_localstorage } from "../components/utils"
import { ADMIN_KEY, LocalhostCred, TOKEN_KEY } from "../constatns/api"

const BASE_URL = import.meta.env.VITE_API_URL

async function handleResponse(res) {
  // 🚨 Handle Unauthorized globally
  if (res.status === 401) {
    clear_localstorage()

    // redirect to login
    window.dispatchEvent(new Event("unauthorized"))

    if (res.message) {
      throw new Error(res.message)
    }else {
      return
    }
  }

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

export async function patch(url, body) {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: "PATCH",
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
  const token = get_localstorage(TOKEN_KEY)
  return token ? { Authorization: `Bearer ${token}` } : {}
}
