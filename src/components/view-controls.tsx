"use client";

import { useEffect, useState } from "react";
import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  RefreshCw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLocalStorage } from "@/hook/use-local-storage";
import { cn } from "@/lib/utils";

interface ViewControlsProps extends React.HTMLAttributes<HTMLDivElement> {
  targetSelector?: string;
}

const MIN_FONT_SIZE = 80;
const MAX_FONT_SIZE = 150;
const DEFAULT_FONT_SIZE = 100;
const FONT_SIZE_STEP = 10;

const MIN_LINE_HEIGHT = 1.25;
const MAX_LINE_HEIGHT = 2.25;
const DEFAULT_LINE_HEIGHT = 1.75;
const LINE_HEIGHT_STEP = 0.1;

export function ViewControls({
  targetSelector = ".answer",
  className,
  ...props
}: ViewControlsProps) {
  const [storedFontSize, setStoredFontSize] = useLocalStorage(
    "fontSize",
    DEFAULT_FONT_SIZE,
  );
  const [storedLineHeight, setStoredLineHeight] = useLocalStorage(
    "lineHeight",
    DEFAULT_LINE_HEIGHT,
  );

  const [fontSize, setFontSize] = useState(storedFontSize);
  const [lineHeight, setLineHeight] = useState(storedLineHeight);

  useEffect(() => {
    const elements = document.querySelectorAll(targetSelector);
    elements.forEach((el) => {
      (el as HTMLElement).style.fontSize = `${fontSize}%`;
      (el as HTMLElement).style.lineHeight = `${lineHeight}rem`;
    });
  }, [fontSize, lineHeight, targetSelector]);

  useEffect(() => {
    setStoredFontSize(fontSize);
  }, [fontSize, setStoredFontSize]);

  useEffect(() => {
    setStoredLineHeight(lineHeight);
  }, [lineHeight, setStoredLineHeight]);

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + FONT_SIZE_STEP, MAX_FONT_SIZE));
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - FONT_SIZE_STEP, MIN_FONT_SIZE));
  };

  const increaseLineHeight = () => {
    setLineHeight((prev) =>
      Math.min(
        parseFloat((prev + LINE_HEIGHT_STEP).toFixed(2)),
        MAX_LINE_HEIGHT,
      ),
    );
  };

  const decreaseLineHeight = () => {
    setLineHeight((prev) =>
      Math.max(
        parseFloat((prev - LINE_HEIGHT_STEP).toFixed(2)),
        MIN_LINE_HEIGHT,
      ),
    );
  };

  const resetSettings = () => {
    setFontSize(DEFAULT_FONT_SIZE);
    setLineHeight(DEFAULT_LINE_HEIGHT);
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
              onClick={decreaseLineHeight}
              disabled={lineHeight <= MIN_LINE_HEIGHT}
              className="size-8"
            >
              <ArrowUpNarrowWide className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>ลดระยะห่างบรรทัด</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={increaseLineHeight}
              disabled={lineHeight >= MAX_LINE_HEIGHT}
              className="size-8"
            >
              <ArrowDownNarrowWide className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>เพิ่มระยะห่างบรรทัด</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={resetSettings}
              className="size-8"
              disabled={
                fontSize === DEFAULT_FONT_SIZE &&
                lineHeight === DEFAULT_LINE_HEIGHT
              }
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
