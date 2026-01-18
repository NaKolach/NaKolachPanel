import ActionButton from "../sidebar/ActionButton"
import { useActionRequest } from "../../hooks/useActionRequest"
import type { Category } from "../../data/category"

type SearchRoutePayload = {
  radius: number
  categories: string[]
}

type SearchRouteButtonProps = {
  radius: number
  filters: Record<string, boolean>
  onSearch: (payload: SearchRoutePayload) => Promise<void>
}

export default function SearchRouteButton({
  radius,
  filters,
  onSearch,
}: SearchRouteButtonProps) {
  const { run, loading } = useActionRequest<SearchRoutePayload>({
    request: onSearch,
  })

  const handleClick = () => {
    run({
      radius,
      categories: Object.keys(filters).filter(id => filters[id]),
    })
  }

  return (
    <ActionButton
      label="Szukaj trasę"
      loadingLabel="Szukam trasy…"
      loading={loading}
      onClick={handleClick}
    />
  )
}
