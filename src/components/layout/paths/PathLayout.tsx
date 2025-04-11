import { useState } from "react";
import { Path } from "../../../store/pathsSlice";
import { PathList } from "./PathList";
import { PathDetails } from "./PathDetails";
import { PathDetailsDialog } from "./PathDetailsDialog";
import { SearchBar } from "../search";
import { Button } from "@mui/material";
import { Eraser } from "lucide-react";

export const PathLayout = ({ paths }: { paths: Path[] }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredPaths = paths.filter(
    (path) =>
      path.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      path.fullDescription.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleDeletePath = (id: string) => {
    if (selectedPathId === id) {
      setSelectedPathId(null);
    }
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSelectPath = (pathId: string) => {
    setSelectedPathId(pathId);
    setDialogOpen(true);
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <div className="w-full sm:w-1/2 p-4 flex flex-col border-r border-gray-300">
        <SearchBar value={searchValue} onChange={setSearchValue} />
        <div className="flex-1 mt-4 pr-4">
          {filteredPaths.length === 0 && searchValue ? (
            <div className="flex flex-col justify-center items-center gap-2">
              <p className="text-center text-xl text-gray-600">
                No matching paths found ...
              </p>
              <Button
                variant="outlined"
                color="error"
                className="mt-4 w-auto px-4 py-2"
                onClick={handleClearSearch}
              >
                <div className="flex items-center gap-2">
                  <Eraser className="w-4 h-4" />
                  <span>Clear search</span>
                </div>
              </Button>
            </div>
          ) : (
            <PathList
              paths={filteredPaths}
              onSelect={(path) => handleSelectPath(path.id)}
              selectedPathId={selectedPathId}
            />
          )}
        </div>
      </div>
      <div className="hidden sm:block w-1/2 p-4 pr-2">
        <PathDetails
          selectedPathId={selectedPathId}
          onDelete={handleDeletePath}
        />
      </div>
      <PathDetailsDialog
        selectedPathId={selectedPathId}
        onDelete={handleDeletePath}
        open={dialogOpen}
        onClose={handleDialogClose}
      />
    </div>
  );
};
