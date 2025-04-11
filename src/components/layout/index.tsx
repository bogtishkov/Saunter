import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaths, Path } from "../../store/pathsSlice";
import { AppDispatch } from "../../store";
import { PathLayout } from "./paths/PathLayout";
import CircularProgress from "@mui/material/CircularProgress";

export const Layout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { paths, loading } = useSelector(
    (state: { paths: { paths: Path[]; loading: boolean } }) => state.paths
  );

  useEffect(() => {
    dispatch(fetchPaths());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return <PathLayout paths={paths} />;
};
