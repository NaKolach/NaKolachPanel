import api from "../api/api"
import {
  setCurrentUserId,
  clearCurrentUserId,
  resetAuthDead,
  markAuthDead,
} from "./authState"

export async function login(payload: {
  login: string
  password: string
}) {
  await api.post("/auth/login", payload)

  const me = await api.get("/profile")
  setCurrentUserId(me.data.id)
  resetAuthDead()
}

export async function register(payload: {
  email: string
  login: string
  password: string
}) {
  await api.post("/auth/register", payload)

  const me = await api.get("/profile")
  setCurrentUserId(me.data.id)
  resetAuthDead()
}

export async function logout() {
  try {
    await api.post("/auth/logout")
  } finally {
    clearCurrentUserId()
    markAuthDead()
  }
}
