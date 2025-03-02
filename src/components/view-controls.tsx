"use client";

import { useEffect, useState } from "react";
import { RefreshCw, ZoomIn, ZoomOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ViewControlsProps extends React.HTMLAttributes<HTMLDivElement> {
  targetSelector?: string;
}

const MIN_FONT_SIZE = 80;
const MAX_FONT_SIZE = 150;
const DEFAULT_FONT_SIZE = 100;

export function ViewControls({
  targetSelector = ".answer",
  className,
  ...props
}: ViewControlsProps) {
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);

  useEffect(() => {
    const elements = document.querySelectorAll(targetSelector);
    elements.forEach((el) => {
      (el as HTMLElement).style.fontSize = `${fontSize}%`;
    });
  }, [fontSize, targetSelector]);

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 10, MAX_FONT_SIZE));
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 10, MIN_FONT_SIZE));
  };

  const resetSettings = () => {
    setFontSize(DEFAULT_FONT_SIZE);
  };

  return (
    <div
      className={cn("flex items-center justify-center gap-2", className)}
      {...props}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={decreaseFontSize}
              disabled={fontSize <= MIN_FONT_SIZE}
              className="size-8"
            >
              <ZoomOut className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>ลดขนาดตัวอักษร</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={increaseFontSize}
              disabled={fontSize >= MAX_FONT_SIZE}
              className="size-8"
            >
              <ZoomIn className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>เพิ่มขนาดตัวอักษร</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={resetSettings}
              className="size-8"
            >
              <RefreshCw className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>รีเซ็ตการตั้งค่า</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
