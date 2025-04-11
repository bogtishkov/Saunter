import { useDispatch, useSelector } from "react-redux";
import {
  updatePathLength,
  toggleFavoritePath,
  deletePathFromDB,
} from "../../../store/pathsSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from "@mui/material";
import { AppDispatch, RootState } from "../../../store";
import { Map } from "../map";
import { formatDistance } from "../../../utils/formatDistance";
import { X } from "lucide-react";

export const PathDetailsDialog = ({
  selectedPathId,
  onDelete,
  open,
  onClose,
}: {
  selectedPathId: string | null;
  onDelete: (id: string) => void;
  open: boolean;
  onClose: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const selectedPath = useSelector((state: RootState) =>
    state.paths.paths.find((p) => p.id === selectedPathId)
  );

  if (!selectedPath) return null;

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
    <Dialog
      className="block md:hidden"
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialogContent-root": {
          overflow: "hidden",
          maxHeight: "calc(100vh - 100px)",
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <X />
      </IconButton>
      <DialogContent>
        <div className="space-y-4 mt-7">
          <div className="flex justify-between items-center text-xl font-semibold">
            <p>{selectedPath.name}</p>
            <p>{formatDistance(selectedPath.length)}</p>
          </div>
          <p className="break-all text-gray-700">
            {selectedPath.fullDescription}
          </p>

          <div className="w-full h-[400px] bg-gray-100 border flex items-center justify-center text-gray-500">
            <Map
              key={selectedPathId}
              onLengthChange={handleLengthChange}
              markers={selectedPath.markers}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <div className="flex gap-3 justify-end w-full">
          <Button
            variant="contained"
            color={selectedPath.isFavorite ? "secondary" : "primary"}
            onClick={handleFavorite}
            size="small"
            className="px-4 py-2"
          >
            {selectedPath.isFavorite
              ? "Remove from favorites"
              : "Add to favorites"}
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDelete}
            size="small"
            className="px-4 py-2"
          >
            Remove
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};
