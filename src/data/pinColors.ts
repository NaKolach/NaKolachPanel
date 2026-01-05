export const PIN_COLORS = {
  red:    { hex: '#ef4444', tw: 'bg-red-500' },
  orange: { hex: '#f97316', tw: 'bg-orange-500' },
  amber:  { hex: '#f59e0b', tw: 'bg-amber-500' },
  lime:   { hex: '#84cc16', tw: 'bg-lime-500' },
  green:  { hex: '#22c55e', tw: 'bg-green-500' },
  teal:   { hex: '#14b8a6', tw: 'bg-teal-500' },
  sky:    { hex: '#38bdf8', tw: 'bg-sky-500' },
  blue:   { hex: '#3b82f6', tw: 'bg-blue-500' },
  indigo: { hex: '#6366f1', tw: 'bg-indigo-500' },
  purple: { hex: '#a855f7', tw: 'bg-purple-500' },
  pink:   { hex: '#ec4899', tw: 'bg-pink-500' },
  rose:   { hex: '#f43f5e', tw: 'bg-rose-500' },
} as const

export type PinColorKey = keyof typeof PIN_COLORS
