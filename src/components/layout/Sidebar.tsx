import UserPanel from "../sidebar/UserPanel"
import RecentRoutes from "../sidebar/RecentRoutes"
import RouteParams from "../sidebar/RouteParams"
import CategoryEditPanel from "../sidebar/CategoryEditPanel"
import SavedRoutesButton from "../sidebar/SavedRoutesButton"
import BackButton from "../sidebar/BackButton"
import SaveLastRouteButton from "../sidebar/SaveLastRouteButton"
import type { User } from "../../data/user"
import type { Category } from "../../data/category"
import type { PinColorKey } from "../../data/pinColors"
import type { BackendPlace } from "../../data/backendPlace"

type SidebarMode =
  | { type: "default" }
  | { type: "edit-category"; category: string }
  | { type: "saved-routes" }

type GraphHopperPath = [number, number][]

interface SidebarProps {
  user: User
  onLogout: () => void

  radius: number
  filters: Record<string, boolean>
  onRadiusChange: (v: number) => void
  onToggleCategory: (id: string) => void

  onSearchRoute: () => Promise<void>
  onSearchRouteByPoints: () => Promise<void>

  sidebarMode: SidebarMode
  setSidebarMode: (v: SidebarMode) => void

  onSelectRecentRoute: (routeId: number) => void

  categories: Category[]
  onSaveCategoryColor: (id: string, color: PinColorKey) => void

  routePath: GraphHopperPath | null
  routePlaces: BackendPlace[]

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

          <div className="py-4">
            <SavedRoutesButton
              onClick={() => setSidebarMode({ type: "saved-routes" })}
            />
          </div>

          <RouteParams
            isSearchingRoute={props.isSearchingRoute}
            radius={props.radius}
            filters={props.filters}
            onRadiusChange={props.onRadiusChange}
            onToggleCategory={props.onToggleCategory}
            onEditCategory={id =>
              setSidebarMode({ type: "edit-category", category: id })
            }
            onSearchRoute={props.onSearchRoute}
            onSearchRouteByPoints={props.onSearchRouteByPoints}
          />

          <SaveLastRouteButton
            routePath={props.routePath}
            routePlaces={props.routePlaces}
          />
        </>
      )}

      {sidebarMode.type === "edit-category" && (
        <CategoryEditPanel
          category={
            props.categories.find(c => c.id === sidebarMode.category)!
          }
          onSave={props.onSaveCategoryColor}
          onClose={() => setSidebarMode({ type: "default" })}
        />
      )}

      {sidebarMode.type === "saved-routes" && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <BackButton
              onClick={() => setSidebarMode({ type: "default" })}
            />
            <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
              Zapisane trasy
            </h2>
          </div>

          <RecentRoutes onSelectRoute={props.onSelectRecentRoute} />
        </div>
      )}
    </aside>
  )
}
