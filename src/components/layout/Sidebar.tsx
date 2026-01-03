import UserPanel from "../sidebar/UserPanel"
import RecentRoutes from "../sidebar/RecentRoutes"
import RouteParams from "../sidebar/RouteParams"

export default function Sidebar(props: any) {
  return (
    <aside className="w-[30%] h-full bg-gray-100 p-6 flex flex-col gap-6 overflow-y-auto">
      <UserPanel />
      <RecentRoutes />
      <RouteParams {...props} />
    </aside>
  )
}