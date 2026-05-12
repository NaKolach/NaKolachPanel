export interface IChosingRoute {
  setChosingRoute: (v: boolean) => void;
  selectedRouteIndex: number;
  setSelectedRouteIndex: (v: number) => void;
  distance: number[];
  routeId: string | null | undefined;
  handleExitChosingRoute: () => void;
}
