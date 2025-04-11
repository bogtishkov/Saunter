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
            <div className="flex justify-between items-stretch gap-3 md:gap-6">
              <div className="flex gap-3 md:gap-6 w-full">
                <div className="flex items-stretch">
                  <Expand className="h-full text-gray-400" />
                </div>
                <div className="flex flex-col justify-center max-w-full md:max-w-[450px]">
                  <div className="flex items-center gap-1">
                    {path.isFavorite && (
                      <Star size={16} className="text-blue-500 fill-blue-500" />
                    )}
                    <h2 className="font-bold text-gray-800 text-base md:text-xl">
                      {path.name}
                    </h2>
                  </div>
                  <p className="text-sm text-gray-600 text-clip truncate text-ellipsis">
                    {path.shortDescription}
                  </p>
                </div>
              </div>
              <div className="flex items-center text-lg font-semibold text-gray-700 whitespace-nowrap gap-3">
                {formatDistance(path.length)}
                <ChevronRight />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
