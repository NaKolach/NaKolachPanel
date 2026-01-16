import { useState } from "react"
import RouteParams from "../../sidebar/RouteParams"
//import RecentRoutes from "../../sidebar/RecentRoutes"

type SheetState = "collapsed" | "half" | "expanded"

interface BottomSheetProps {
  radius: number
  filters: Record<string, boolean>
  onRadiusChange: (v: number) => void
  onToggleCategory: (id: string) => void
  onEditCategory: (id: string) => void
  onSearchRoute: () => Promise<void>
  isSearchingRoute: boolean
  onSelectRecentRoute: (route: any) => void
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
      <div className="px-4 pb-4 max-h-[75vh] overflow-y-auto space-y-4">
        {/* <RecentRoutes onSelectRoute={props.onSelectRecentRoute} /> */}

        <RouteParams
          radius={props.radius}
          filters={props.filters}
          onRadiusChange={props.onRadiusChange}
          onToggleCategory={props.onToggleCategory}
          onEditCategory={props.onEditCategory}
          onSearchRoute={handleSearch}
          isSearchingRoute={props.isSearchingRoute}
        />
      </div>
    </div>
  )
}
