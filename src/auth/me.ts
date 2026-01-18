import api from "../api/api"
import { setCurrentUserId } from "./authState"

export async function getMe() {
  const res = await api.get("/profile")
  setCurrentUserId(res.data.id)
  return res.data
}