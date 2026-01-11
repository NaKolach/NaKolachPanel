export type GraphHopperResponse = {
  paths: {
    points: {
      type: "LineString"
      coordinates: [number, number][]
    }
  }[]
}
