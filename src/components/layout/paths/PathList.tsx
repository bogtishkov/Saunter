import { ChevronRight, Expand, Star } from "lucide-react";
import { Path } from "../../../store/pathsSlice";
import clsx from "clsx";
import { formatDistance } from "../../../utils/formatDistance";

export const PathList = ({
  paths,
  selectedPathId,
  onSelect,
}: {
  paths: Path[];
  selectedPathId: string | null;
  onSelect: (path: Path) => void;
}) => {
  if (paths.length === 0) {
    return (
      <div className="text-center text-2xl text-gray-600">
        There are no paths available yet ...
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {paths.map((path) => {
        const isSelected = selectedPathId === path.id;
        return (
          <div
            key={path.id}
            className={clsx(
              "p-4 cursor-pointer rounded-md transition-colors border border-gray-200",
              {
                "bg-blue-200": isSelected,
                "bg-gray-50 hover:bg-gray-100": !isSelected,
              }
            )}
            onClick={() => onSelect(path)}
          >
            <div className="flex items-stretch gap-3 md:gap-6">
              <div className="flex gap-3 md:gap-6 flex-1 min-w-0">
                <div className="flex items-stretch">
                  <Expand className="h-full text-gray-400" />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <div className="flex items-center gap-1">
                    {path.isFavorite && (
                      <Star size={16} className="text-blue-500 fill-blue-500" />
                    )}
                    <h2 className="font-bold text-gray-800 text-base md:text-xl truncate">
                      {path.name}
                    </h2>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {path.shortDescription}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 text-md md:text-lg font-semibold text-gray-700 whitespace-nowrap pl-2">
                <span className="truncate">{formatDistance(path.length)}</span>
                <ChevronRight />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
