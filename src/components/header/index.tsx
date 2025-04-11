import { useState } from "react";
import { Expand, X } from "lucide-react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import { AddPathForm } from "./AddPathForm";

export const Header = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <header className="flex justify-between items-center px-4 py-4 bg-white shadow-md">
      <div className="flex items-center gap-1 sm:gap-2">
        <Expand className="w-5 h-5 text-gray-700 md:w-7 md:h-7" />
        <span className="text-2xl font-semibold text-gray-800">Saunter</span>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        className="whitespace-nowrap text-sm"
      >
        Add Path
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Path</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
          <AddPathForm onSuccess={handleClose} />
        </DialogContent>
      </Dialog>
    </header>
  );
};
