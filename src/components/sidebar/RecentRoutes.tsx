import { useState } from "react"
import type { SavedRouteSummary } from "../../data/savedRouteSummary"
import { MOCK_SAVED_ROUTES } from "../../data/mockSidebarSavedRoutes"

interface RecentRoutesProps {
  onSelectRoute: (index: number) => void
}

export default function RecentRoutes({ onSelectRoute }: RecentRoutesProps) {
  const [routes, setRoutes] = useState<SavedRouteSummary[]>(MOCK_SAVED_ROUTES)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [draftName, setDraftName] = useState("")
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null)

  const startEdit = (route: SavedRouteSummary) => {
    setEditingId(route.id)
    setDraftName(route.name)
  }

  const commitEdit = () => {
    if (editingId === null) return

    setRoutes(prev =>
      prev.map(r =>
        r.id === editingId && draftName.trim()
          ? { ...r, name: draftName.trim() }
          : r
      )
    )

    setEditingId(null)
    setDraftName("")
  }

  const cancelEdit = () => {
    setEditingId(null)
    setDraftName("")
  }

  const confirmDelete = (routeId: number) => {
    setRoutes(prev => prev.filter(r => r.id !== routeId))
    setConfirmDeleteId(null)
  }

  const saveAiRoute = (routeId: number) => {
    setRoutes(prev =>
      prev.map(r =>
        r.id === routeId
          ? { ...r, isAi: false }
          : r
      )
    )
  }

  if (routes.length === 0) {
    return (
      <div className="py-6 text-sm text-gray-500 dark:text-gray-400">
        Brak zapisanych tras
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 py-4">
      {routes.map((route, index) => (
        <div
          key={route.id}
          className="
            px-4 py-3
            rounded-xl
            bg-white dark:bg-gray-700
            hover:bg-gray-100 dark:hover:bg-gray-600
            transition-colors
          "
        >
          {/* GÓRA */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1">
              {editingId === route.id ? (
                <input
                  value={draftName}
                  autoFocus
                  onChange={e => setDraftName(e.target.value)}
                  onBlur={commitEdit}
                  onKeyDown={e => {
                    if (e.key === "Enter") commitEdit()
                    if (e.key === "Escape") cancelEdit()
                  }}
                  className="
                    w-full
                    bg-transparent
                    text-sm font-medium
                    text-gray-800 dark:text-gray-200
                    outline-none
                    border-b border-gray-300 dark:border-gray-500
                  "
                />
              ) : (
                <span
                  onClick={() => onSelectRoute(index)}
                  className="text-sm font-medium text-gray-800 dark:text-gray-200 cursor-pointer"
                >
                  {route.name}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {route.isAi && (
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                  AI
                </span>
              )}

              {!route.isAi && (
                <button
                  onClick={() => startEdit(route)}
                  className="text-xs text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  ✎
                </button>
              )}

              {route.isAi ? (
                <button
                  onClick={() => saveAiRoute(route.id)}
                  className="
                    text-xs
                    px-2 py-1
                    rounded-md
                    bg-green-600
                    text-white
                    hover:bg-green-700
                  "
                >
                  Zapisz
                </button>
              ) : (
                <button
                  onClick={() => setConfirmDeleteId(route.id)}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* DÓŁ */}
          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {route.length} km · {route.categories.join(", ")}
          </div>

          {/* POTWIERDZENIE USUNIĘCIA */}
          {confirmDeleteId === route.id && (
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">
                Usunąć trasę?
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => confirmDelete(route.id)}
                  className="px-2 py-1 rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  Usuń
                </button>

                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="px-2 py-1 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Anuluj
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
