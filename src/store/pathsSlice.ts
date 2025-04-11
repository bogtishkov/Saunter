import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export type Path = {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  length: number;
  isFavorite: boolean;
  markers: { lat: number; lng: number }[];
};

interface PathsState {
  paths: Path[];
  loading: boolean;
}

const initialState: PathsState = {
  paths: [],
  loading: false,
};

const pathsRef = collection(db, "paths");

export const fetchPaths = createAsyncThunk("paths/fetchPaths", async () => {
  const snapshot = await getDocs(pathsRef);
  const paths = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Path[];

  const sortedPaths = paths.sort((a, b) => {
    if (a.isFavorite === b.isFavorite) return 0;
    return a.isFavorite ? -1 : 1;
  });

  return sortedPaths;
});

export const addPathToDB = createAsyncThunk(
  "paths/addPathToDB",
  async (path: Omit<Path, "id">) => {
    const docRef = await addDoc(pathsRef, path);
    return { id: docRef.id, ...path };
  }
);

export const deletePathFromDB = createAsyncThunk(
  "paths/deletePathFromDB",
  async (id: string) => {
    await deleteDoc(doc(db, "paths", id));
    return id;
  }
);

export const updatePathLength = createAsyncThunk(
  "paths/updatePathLength",
  async ({ id, length }: { id: string; length: number }) => {
    await updateDoc(doc(db, "paths", id), { length });
    return { id, length };
  }
);

export const toggleFavoritePath = createAsyncThunk(
  "paths/toggleFavoritePath",
  async (id: string, { getState }) => {
    const state = getState() as { paths: PathsState };
    const currentPaths = state.paths.paths;

    const pathToUpdate = currentPaths.find((path) => path.id === id);

    if (!pathToUpdate) {
      return { id, isFavorite: false, sortedPaths: currentPaths };
    }

    const updatedPath: Path = {
      ...pathToUpdate,
      isFavorite: !pathToUpdate.isFavorite,
    };

    await updateDoc(doc(db, "paths", id), {
      isFavorite: updatedPath.isFavorite,
    });

    const filteredPaths = currentPaths.filter((p) => p.id !== id);

    let updatedPaths: Path[];

    if (updatedPath.isFavorite) {
      const favorites = filteredPaths.filter((p) => p.isFavorite);
      const nonFavorites = filteredPaths.filter((p) => !p.isFavorite);
      updatedPaths = [updatedPath, ...favorites, ...nonFavorites];
    } else {
      const favorites = filteredPaths.filter((p) => p.isFavorite);
      const nonFavorites = filteredPaths.filter((p) => !p.isFavorite);
      updatedPaths = [...favorites, updatedPath, ...nonFavorites];
    }

    return {
      id,
      isFavorite: updatedPath.isFavorite,
      sortedPaths: updatedPaths,
    };
  }
);

const pathSlice = createSlice({
  name: "paths",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaths.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPaths.fulfilled, (state, action) => {
        state.paths = action.payload;
        state.loading = false;
      })
      .addCase(addPathToDB.fulfilled, (state, action) => {
        const newPath = action.payload;
        const newPaths = [...state.paths, newPath];
        const sortedPaths = newPaths.sort((a, b) => {
          if (a.isFavorite === b.isFavorite) return 0;
          return a.isFavorite ? -1 : 1;
        });
        state.paths = sortedPaths;
      })
      .addCase(deletePathFromDB.fulfilled, (state, action) => {
        state.paths = state.paths.filter((r) => r.id !== action.payload);
      })
      .addCase(toggleFavoritePath.fulfilled, (state, action) => {
        state.paths = action.payload.sortedPaths;
      })
      .addCase(updatePathLength.fulfilled, (state, action) => {
        const path = state.paths.find((p) => p.id === action.payload.id);
        if (path) {
          path.length = action.payload.length;
        }
      });
  },
});

export default pathSlice.reducer;
