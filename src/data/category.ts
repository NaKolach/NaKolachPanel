// domain/category.ts
import type { ComponentType } from 'react'
import type { PinColorKey } from '../data/pinColors'

export type Category = {
  id: string
  label: string
  Icon: ComponentType<{ className?: string }>
  iconUrl: string
  pinColor: PinColorKey
}