import type { IChosingRoute } from "../interfaces/IChosingRoute";
import ChosingRouteCard from "./ChosingRouteCard";
import SaveLastRouteButton from "./SaveLastRouteButton";

const ChosingRoute = (props: IChosingRoute) => {
  return (
    <>
      <div className="flex gap-5 mb-6">
        <button
          className="cursor-pointer"
          onClick={() => props.handleExitChosingRoute()}
        >
          ←
        </button>
        <h1>Wybor trasy</h1>
      </div>
      <div>
        <ChosingRouteCard
          title="Trasa 1"
          distance={props.distance[0]}
          isSelected={props.selectedRouteIndex === 0}
          onClick={() => props.setSelectedRouteIndex(0)}
        />
        <ChosingRouteCard
          title="Trasa 2"
          distance={props.distance[1]}
          isSelected={props.selectedRouteIndex === 1}
          onClick={() => props.setSelectedRouteIndex(1)}
        />
        <ChosingRouteCard
          title="Trasa 3"
          distance={props.distance[2]}
          isSelected={props.selectedRouteIndex === 2}
          onClick={() => props.setSelectedRouteIndex(2)}
        />
      </div>

      <SaveLastRouteButton routeId={props.routeId} />
    </>
  );
};

export default ChosingRoute;
