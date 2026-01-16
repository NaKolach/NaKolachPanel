import type { SavedRouteSummary } from "./savedRouteSummary"

export const MOCK_SAVED_ROUTES: SavedRouteSummary[] = [
  {
    id: 1,
    name: "AI Trasa Centrum",
    radius: 8,
    length: 67,
    categories: ["parks", "coffee"],
    isAi: true,
  },
  {
    id: 2,
    name: "Manual Muzea",
    radius: 12,
    length: 2137,
    categories: ["parks"],
    isAi: false,
  },
]
