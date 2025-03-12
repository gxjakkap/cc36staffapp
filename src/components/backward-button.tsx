"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

import { Button } from "./ui/button";

function BackwardButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="outline"
      size="icon"
      className="cursor-pointer"
      effect="shineHover"
    >
      <ArrowLeftIcon />
    </Button>
  );
}
export default BackwardButton;
