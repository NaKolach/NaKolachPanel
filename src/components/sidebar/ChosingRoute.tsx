import type { IChosingRoute } from "../interfaces/IChosingRoute";

const ChosingRoute = (props: IChosingRoute) => {
  return (
    <>
      <div className="flex gap-5">
        <button
          className="cursor-pointer"
          onClick={() => props.setChosingRoute(false)}
        >
          ←
        </button>
        <h1>Wybor trasy</h1>
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default ChosingRoute;
