import api from "../api/api"

export async function login(payload: {
  login: string
  password: string
}) {
  await api.post("/auth/login", payload)
}

export async function register(payload: {
  email: string
  login: string
  password: string
}) {
  await api.post("/auth/register", payload)
}

export async function logout() {
  await api.post("/auth/logout")
}
