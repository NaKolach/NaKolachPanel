// api/api.ts
import axios, { AxiosError, type AxiosRequestConfig } from "axios"
import {currentUserId, markAuthDead } from "../auth/authState"

type RetryConfig = AxiosRequestConfig & { _retry?: boolean }

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
})

const AUTH_SKIP = [
  "/auth/login",
  "/auth/register",
  "/auth/refresh",
  "/auth/logout",
]

let isRefreshing = false

let queue: Array<{
  resolve: () => void
  reject: (reason?: unknown) => void
}> = []

function resolveQueue(error?: unknown) {
  queue.forEach(p => {
    if (error) p.reject(error)
    else p.resolve()
  })
  queue = []
}

api.interceptors.response.use(
  res => res,
  async (error: AxiosError) => {
    const config = error.config as RetryConfig | undefined
    const status = error.response?.status
    const url = config?.url ?? ""

    if (
      !config ||
      status !== 401 ||
      config._retry ||
      AUTH_SKIP.some(p => url.startsWith(p))
    ) {
      return Promise.reject(error)
    }

    if (!currentUserId) {
      markAuthDead()
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise<void>((resolve, reject) => {
        queue.push({ resolve, reject })
      }).then(() => {
        config._retry = true
        return api(config)
      })
    }

    isRefreshing = true
    config._retry = true

    try {
      await api.post(
        "/auth/refresh",
        { userId: currentUserId },
        { headers: { "Content-Type": "application/json" } }
      )

      isRefreshing = false
      resolveQueue()
      return api(config)
    } catch (refreshError) {
      isRefreshing = false
      resolveQueue(refreshError)
      markAuthDead()
      return Promise.reject(refreshError)
    }
  }
)

export default api
