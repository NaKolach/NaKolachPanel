import CategoryEditPanel from "../../sidebar/CategoryEditPanel"
import type { Category } from "../../../data/category"
import type { PinColorKey } from "../../../data/pinColors"

interface CategoryEditModalProps {
  category: Category
  onSave: (id: string, color: PinColorKey) => void
  onClose: () => void
}

export default function CategoryEditModal({
  category,
  onSave,
  onClose,
}: CategoryEditModalProps) {
  return (
    <div className="fixed inset-0 z-2000 bg-white dark:bg-gray-900">
      <div className="h-full p-4 overflow-y-auto">
        <CategoryEditPanel
          category={category}
          onSave={onSave}
          onClose={onClose}
        />
      </div>
    </div>
  )
}
