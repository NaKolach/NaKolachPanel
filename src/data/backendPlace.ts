export type BackendPlace = {
  id: number
  categoryId: string
  lat?: number
  lon?: number
  latitude?: number
  longitude?: number
  center?: {
    lat: number
    lon: number
  }
  tags: Record<string, string>
}