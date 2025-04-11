import { useForm } from "react-hook-form";
import { TextField, Button, FormHelperText } from "@mui/material";
import { addPathToDB, Path } from "../../store/pathsSlice";
import { useAppDispatch } from "../../store";
import { Map as MapComponent } from "../layout/map";
import { Map } from "lucide-react";
import { formatDistance } from "../../utils/formatDistance";

type PathFormData = Omit<Path, "id">;

export const AddPathForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PathFormData>({
    defaultValues: {
      name: "",
      shortDescription: "",
      fullDescription: "",
      length: 0,
      isFavorite: false,
      markers: [],
    },
  });

  const shortDescription = watch("shortDescription");
  const length = watch("length");
  const markers = watch("markers");

  const onSubmit = async (data: PathFormData) => {
    if (data.length <= 0) return;
    await dispatch(addPathToDB(data));
    onSuccess?.();
  };

  const isAddPathDisabled = markers.length < 2;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 md:flex-row md:gap-8 md:mt-4 md:min-h-[500px]"
    >
      <div className="flex flex-col gap-6 w-full md:w-1/2">
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
          {...register("name", { required: "*Required" })}
        />

        <div className="relative">
          <TextField
            label="Short Description"
            variant="outlined"
            fullWidth
            multiline
            minRows={2}
            error={!!errors.shortDescription}
            helperText={errors.shortDescription?.message}
            {...register("shortDescription", {
              required: "*Required",
              maxLength: {
                value: 160,
                message: "Maximum 160 characters",
              },
            })}
          />
          <FormHelperText
            className={`text-sm mt-1 text-right ${
              shortDescription.length > 160 ? "text-red-500" : "text-gray-500"
            }`}
          >
            Limit {shortDescription.length} of 160
          </FormHelperText>
        </div>

        <TextField
          label="Full Description"
          variant="outlined"
          fullWidth
          multiline
          minRows={3}
          error={!!errors.fullDescription}
          helperText={errors.fullDescription?.message}
          {...register("fullDescription", { required: "*Required" })}
        />

        <div className="mt-1">
          <h2 className="flex items-center gap-2 text-base font-medium text-gray-700 md:text-lg">
            <Map className="w-5 h-5 text-gray-500" />
            Length {formatDistance(length)}
          </h2>
        </div>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isAddPathDisabled}
          className="w-full md:w-fit self-center md:self-start"
        >
          Add Route
        </Button>
      </div>

      <div className="w-full h-64 md:h-auto md:w-1/2">
        <MapComponent
          markers={markers}
          onLengthChange={(length) => setValue("length", length)}
          onMarkerChange={(markers) => setValue("markers", markers)}
        />
      </div>
    </form>
  );
};
