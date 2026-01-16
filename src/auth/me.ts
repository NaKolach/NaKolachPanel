import api from "../api/api"

export async function getMe() {
  const res = await api.get("/profile")
  return res.data
}

