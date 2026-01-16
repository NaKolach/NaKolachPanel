import { useEffect, useState } from "react"
import api from "../../api/api"
import type { BackendPlace } from "../../data/backendPlace"

type UserRoute = {
  id: number
  name: string
  radius: number
  path: [number, number][]
  points: BackendPlace[]
}

interface RecentRoutesProps {
  onSelectRoute: (route: UserRoute) => void
}

export default function RecentRoutes({ onSelectRoute }: RecentRoutesProps) {
  const [routes, setRoutes] = useState<UserRoute[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get<UserRoute[]>("/profile")
      .then(res => setRoutes(res.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-700 rounded-lg p-4 text-sm">
        Ładowanie tras…
      </div>
    )
  }

  if (routes.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-700 rounded-lg p-4 text-sm">
        Brak zapisanych tras
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 text-sm">
      <div className="font-medium mb-2 text-gray-900 dark:text-gray-100">
        Ostatnie trasy
      </div>

      <ul className="space-y-2">
        {routes.map(route => (
          <li key={route.id}>
            <button
              onClick={() => onSelectRoute(route)}
              className="
                w-full text-left
                px-2 py-1 rounded
                hover:bg-gray-100 dark:hover:bg-gray-600
                text-gray-800 dark:text-gray-200
              "
            >
              {route.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
