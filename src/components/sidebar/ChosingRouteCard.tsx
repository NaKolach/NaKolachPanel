interface ChosingRouteCardProps {
  title: string;
  distance: number;
  isSelected?: boolean;
  onClick?: () => void;
}

const ChosingRouteCard = ({
  title,
  distance,
  isSelected,
  onClick,
}: ChosingRouteCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left p-4 mb-3 rounded-2xl transition-all duration-200
        flex items-center justify-between group
        active:scale-[0.98] 
        
        ${
          isSelected
            ? "bg-green-600 text-white shadow-lg shadow-green-900/20"
            : "bg-white/50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm"
        }
      `}
    >
      <div className="flex items-center gap-4">
        {/* TEKST */}
        <div className="flex flex-col">
          <span
            className={`font-bold text-sm ${isSelected ? "text-white" : "text-gray-900 dark:text-gray-100"}`}
          >
            {title}
          </span>
          <span
            className={`text-xs ${isSelected ? "text-green-100" : "text-gray-500 dark:text-gray-400"}`}
          >
            Dystans: <span className="font-semibold">{distance} km</span>
          </span>
        </div>
      </div>

      {/* STRZAŁKA LUB INDYKATOR (PO PRAWEJ) */}
      <div
        className={`
        text-xl font-bold transition-transform duration-300 group-hover:translate-x-1
        ${isSelected ? "text-white" : "text-gray-300 dark:text-gray-500"}
      `}
      >
        →
      </div>
    </button>
  );
};

export default ChosingRouteCard;
