import { useState } from "react"
import RouteParams from "../../sidebar/RouteParams"
import RecentRoutes from "../../sidebar/RecentRoutes"
import BackButton from "../../sidebar/BackButton"

type SheetState = "collapsed" | "half" | "expanded"

interface BottomSheetProps {
  radius: number
  filters: Record<string, boolean>
  onRadiusChange: (v: number) => void
  onToggleCategory: (id: string) => void
  onEditCategory: (id: string) => void

  onSearchRoute: () => Promise<void>
  onSearchRouteByPoints: () => Promise<void>

  isSearchingRoute: boolean
  onSelectRecentRoute: (routeId: number) => void
  mode: "default" | "saved-routes"
  onBack: () => void
}

const translateMap: Record<SheetState, string> = {
  collapsed: "translate-y-[70%]",
  half: "translate-y-[40%]",
  expanded: "translate-y-0",
}

export default function BottomSheet(props: BottomSheetProps) {
  const [state, setState] = useState<SheetState>("collapsed")

  const handleSearch = async () => {
    if (props.isSearchingRoute) return
    await props.onSearchRoute()
    setState("collapsed")
  }

  const handleSearchByPoints = async () => {
    if (props.isSearchingRoute) return
    await props.onSearchRouteByPoints()
    setState("collapsed")
  }

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-1000
        bg-white dark:bg-gray-800
        rounded-t-2xl shadow-xl
        transition-transform duration-300 ease-out
        ${translateMap[state]}
      `}
    >
      {/* DRAG HANDLE */}
      <div
        onClick={() =>
          setState(s =>
            s === "collapsed"
              ? "half"
              : s === "half"
              ? "expanded"
              : "collapsed"
          )
        }
        className="flex justify-center py-2 cursor-pointer"
      >
        <div className="w-10 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
      </div>

      {/* CONTENT */}
      <div className="px-4 pb-4 max-h-[75vh] overflow-y-auto">
        {props.mode === "saved-routes" ? (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 pt-2">
              <BackButton onClick={props.onBack} />
              <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                Zapisane trasy
              </h2>
            </div>

            <RecentRoutes onSelectRoute={props.onSelectRecentRoute} />
          </div>
        ) : (
          <div className="space-y-4">
            <RouteParams
              radius={props.radius}
              filters={props.filters}
              isSearchingRoute={props.isSearchingRoute}
              onRadiusChange={props.onRadiusChange}
              onToggleCategory={props.onToggleCategory}
              onEditCategory={props.onEditCategory}
              onSearchRoute={handleSearch}
              onSearchRouteByPoints={handleSearchByPoints}
            />
          </div>
        )}
      </div>
    </div>
  )
}
