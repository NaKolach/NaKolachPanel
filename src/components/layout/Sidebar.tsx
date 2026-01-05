import UserPanel from "../sidebar/UserPanel"
import RecentRoutes from "../sidebar/RecentRoutes"
import RouteParams from "../sidebar/RouteParams"
import CategoryEditPanel from "../sidebar/CategoryEditPanel"
import type { User } from "../../data/user"
import type { Category } from '../../data/category'
import type { PinColorKey } from '../../data/pinColors'
interface SidebarProps {
  user: User
  onLogout: () => void
  radius: number
  filters: Record<string, boolean>
  onRadiusChange: (v: number) => void
  onFiltersChange: (v: Record<string, boolean>) => void

  sidebarMode:
    | { type: 'default' }
    | { type: 'edit-category'; categoryId: string }

  setSidebarMode: (v: any) => void

  categories: Category[]
  onSaveCategoryColor: (id: string, color: PinColorKey) => void
}


export default function Sidebar(props: SidebarProps) {
  const { sidebarMode, setSidebarMode } = props

  return (
    <aside className="w-[30%] h-full bg-gray-200 dark:bg-gray-800 border-r p-6 flex flex-col">
      {sidebarMode.type === 'default' && (
        <>
          <UserPanel username={props.user.username} onLogout={props.onLogout} />
          <RecentRoutes />
          <RouteParams
            radius={props.radius}
            filters={props.filters}
            onRadiusChange={props.onRadiusChange}
            onFiltersChange={props.onFiltersChange}
            onEditCategory={(id) =>
              setSidebarMode({ type: 'edit-category', categoryId: id })
            }
          />
        </>
      )}

      {sidebarMode.type === 'edit-category' && (
        <CategoryEditPanel
          category={
            props.categories.find(c => c.id === sidebarMode.categoryId)!
          }
          onSave={props.onSaveCategoryColor}
          onClose={() => setSidebarMode({ type: 'default' })}
        />
      )}
    </aside>
  )
}

