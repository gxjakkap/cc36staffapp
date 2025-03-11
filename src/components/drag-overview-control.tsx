"use client";

import { Pointer, PointerOff } from "lucide-react";

import { useDrag } from "@/components/drag-context";
import { Button } from "@/components/ui/button";

export function DragOverviewControl() {
  const { isDragDisabled, toggleDragDisabled } = useDrag();

  return (
    <Button
      variant={isDragDisabled ? "outline" : "secondary"}
      size="icon"
      className="fixed right-4 bottom-4 z-50 md:right-6 md:bottom-6"
      onClick={toggleDragDisabled}
    >
      {isDragDisabled ? <PointerOff /> : <Pointer />}
      <span className="sr-only">Toggle drag interaction</span>
    </Button>
  );
}
