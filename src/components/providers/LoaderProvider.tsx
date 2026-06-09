"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";

type LoaderContextType = {
  total: number;
  loaded: number;
  progress: number;
  addAssets: (count: number) => void;
  assetLoaded: () => void;
  isComplete: boolean;
};

const LoaderContext = createContext<LoaderContextType | null>(null);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [total, setTotal] = useState(0);
  const [loaded, setLoaded] = useState(0);

  const addAssets = (count: number) => {
    setTotal((prev) => prev + count);
  };

  const assetLoaded = () => {
    setLoaded((prev) => prev + 1);
  };

  const progress = total === 0 ? 0 : Math.min((loaded / total) * 100, 100);

  const isComplete = loaded >= total && total > 0;

  const value = useMemo(
    () => ({
      total,
      loaded,
      progress,
      addAssets,
      assetLoaded,
      isComplete,
    }),
    [total, loaded, progress, isComplete],
  );

  return (
    <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error("useLoader must be inside LoaderProvider");
  }

  return context;
}
