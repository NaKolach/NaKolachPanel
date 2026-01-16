import UserPanel from "../sidebar/UserPanel"
//import RecentRoutes from "../sidebar/RecentRoutes"
import RouteParams from "../sidebar/RouteParams"
import CategoryEditPanel from "../sidebar/CategoryEditPanel"
import type { User } from "../../data/user"
import type { Category } from "../../data/category"
import type { PinColorKey } from "../../data/pinColors"
import type { BackendPlace } from "../../data/backendPlace"

interface SidebarProps {
  user: User
  onLogout: () => void

  radius: number
  filters: Record<string, boolean>
  onRadiusChange: (v: number) => void
  onToggleCategory: (id: string) => void

  sidebarMode:
    | { type: "default" }
    | { type: "edit-category"; category: string }

  setSidebarMode: (v: any) => void

  onSelectRecentRoute: (route: {
    radius: number
    path: [number, number][]
    points: BackendPlace[]
  }) => void

  categories: Category[]
  onSaveCategoryColor: (id: string, color: PinColorKey) => void
  onSearchRoute: () => Promise<void>

  isSearchingRoute: boolean
}

export default function Sidebar(props: SidebarProps) {
  const { sidebarMode, setSidebarMode } = props

  return (
    <aside className="w-[30%] max-w-[350px] h-full bg-gray-200 dark:bg-gray-800 border-r p-6 flex flex-col">
      {sidebarMode.type === "default" && (
        <>
          <UserPanel
            login={props.user.login}
            onLogout={props.onLogout}
          />

          {/* <RecentRoutes onSelectRoute={props.onSelectRecentRoute} /> */}

          <RouteParams
            isSearchingRoute={props.isSearchingRoute}
            radius={props.radius}
            filters={props.filters}
            onRadiusChange={props.onRadiusChange}
            onToggleCategory={props.onToggleCategory}
            onEditCategory={(id) =>
              setSidebarMode({ type: "edit-category", category: id })
            }
            onSearchRoute={props.onSearchRoute}
          />
        </>
      )}

      {sidebarMode.type === "edit-category" && (
        <CategoryEditPanel
          category={
            props.categories.find(
              (c) => c.id === sidebarMode.category
            )!
          }
          onSave={props.onSaveCategoryColor}
          onClose={() => setSidebarMode({ type: "default" })}
        />
      )}
    </aside>
  )
}