import type { PathProfileContentProps } from "../interfaces/PathProfileContentProps";

const PathProfileContent = (props: PathProfileContentProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="pathProfile"
          id="Standard"
          checked={props.pathProfile === "Standard"}
          onChange={() => props.setPathProfile("Standard")}
          className="w-4 h-4 cursor-pointer"
        />
        <label htmlFor="Standard" className="cursor-pointer text-sm">
          Standard
        </label>
      </div>

      <div className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="pathProfile"
          id="Mtb"
          checked={props.pathProfile === "Mtb"}
          onChange={() => props.setPathProfile("Mtb")}
          className="w-4 h-4 cursor-pointer"
        />
        <label htmlFor="Mtb" className="cursor-pointer text-sm">
          Mtb
        </label>
      </div>

      <div className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="pathProfile"
          id="Road"
          checked={props.pathProfile === "Road"}
          onChange={() => props.setPathProfile("Road")}
          className="w-4 h-4 cursor-pointer"
        />
        <label htmlFor="Road" className="cursor-pointer text-sm">
          Road
        </label>
      </div>

      <div className="flex items-center gap-2 cursor-pointer mb-2">
        <input
          type="radio"
          name="pathProfile"
          id="Family"
          checked={props.pathProfile === "Family"}
          onChange={() => props.setPathProfile("Family")}
          className="w-4 h-4 cursor-pointer"
        />
        <label htmlFor="Family" className="cursor-pointer text-sm">
          Family
        </label>
      </div>
    </div>
  );
};

export default PathProfileContent;
