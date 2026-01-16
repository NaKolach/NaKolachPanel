import { useEffect } from "react"

interface MapResetControllerProps {
  resetKey: unknown
  onReset: () => void
}

export default function MapResetController({
  resetKey,
  onReset,
}: MapResetControllerProps) {
  useEffect(() => {
    onReset()
  }, [resetKey])

  return null
}
