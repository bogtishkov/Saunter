import { Expand } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePathLength,
  toggleFavoritePath,
  deletePathFromDB,
} from "../../../store/pathsSlice";
import { Button } from "@mui/material";
import { AppDispatch, RootState } from "../../../store";
import { Map } from "../map";
import { formatDistance } from "../../../utils/formatDistance";

export const PathDetails = ({
  selectedPathId,
  onDelete,
}: {
  selectedPathId: string | null;
  onDelete: (id: string) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const selectedPath = useSelector((state: RootState) =>
    state.paths.paths.find((p) => p.id === selectedPathId)
  );

  if (!selectedPath) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Expand size={150} />
          <p className="text-gray-500">Select any path</p>
        </div>
      </div>
    );
  }

  const handleLengthChange = (length: number) => {
    dispatch(updatePathLength({ id: selectedPath.id, length }));
  };

  const handleFavorite = () => {
    dispatch(toggleFavoritePath(selectedPath.id));
  };

  const handleDelete = () => {
    dispatch(deletePathFromDB(selectedPath.id));
    onDelete(selectedPath.id);
  };

  return (
    <div className="space-y-4 px-5">
      <div className="flex justify-between items-center text-2xl font-bold">
        <p>{selectedPath.name}</p>
        <p>{formatDistance(selectedPath.length)}</p>
      </div>
      <p className="break-all text-gray-700">{selectedPath.fullDescription}</p>
      <div className="w-full h-[400px] bg-gray-100 border flex items-center justify-center text-gray-500">
        <Map
          key={selectedPathId}
          onLengthChange={handleLengthChange}
          markers={selectedPath.markers}
        />
      </div>
      <div className="flex gap-4 justify-end">
        <Button
          variant="contained"
          color={selectedPath.isFavorite ? "secondary" : "primary"}
          onClick={handleFavorite}
        >
          {selectedPath.isFavorite
            ? "Remove from favorites"
            : "Add to favorites"}
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Remove
        </Button>
      </div>
    </div>
  );
};
