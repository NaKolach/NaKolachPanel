import api from "../api/api"

export async function getMe() {
  const res = await api.get("/auth/me")
  return res.data
}

