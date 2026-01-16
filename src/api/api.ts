import axios, { AxiosError, type AxiosRequestConfig } from "axios"

type RetryConfig = AxiosRequestConfig & { _retry?: boolean }

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
})

const AUTH_SKIP = ["/auth/", "/profile"]

let isRefreshing = false

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
      isRefreshing ||
      AUTH_SKIP.some(p => url.startsWith(p))
    ) {
      return Promise.reject(error)
    }

    config._retry = true
    isRefreshing = true

    try {
      await api.post("/auth/refresh")
      return api(config)
    } catch {
      try {
        await api.post("/auth/logout")
      } catch {}
      window.location.replace("/login")
      return Promise.reject(error)
    } finally {
      isRefreshing = false
    }
  }
)

export default api
