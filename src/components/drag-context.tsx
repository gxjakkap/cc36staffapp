"use client";

import { createContext, useContext } from "react";
import { useLocalStorage } from "usehooks-ts";

interface DragContextType {
  isDragDisabled: boolean;
  toggleDragDisabled: () => void;
}

const DragContext = createContext<DragContextType | undefined>(undefined);

export function DragProvider({ children }: { children: React.ReactNode }) {
  const [isDragDisabled, setIsDragDisabled] = useLocalStorage(
    "disable-drag",
    false,
  );

  const toggleDragDisabled = () => {
    setIsDragDisabled(!isDragDisabled);
  };

  return (
    <DragContext.Provider value={{ isDragDisabled, toggleDragDisabled }}>
      {children}
    </DragContext.Provider>
  );
}

export function useDrag() {
  const context = useContext(DragContext);
  if (!context) {
    throw new Error("useDrag must be used within a DragProvider");
  }
  return context;
}
