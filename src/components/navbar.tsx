"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@/components/sign-out-button";
import { cn } from "@/lib/utils";

import { ThemeToggle } from "./theme-toggle";

interface NavbarProps {
  isAdmin?: boolean;
}

export function Navbar({ isAdmin }: NavbarProps) {
  const pathname = usePathname();

  return (
    <div className="flex py-4 px-10 border-b sticky top-0 bg-border/10 backdrop-blur z-10">
      <nav className="flex justify-end w-full items-center gap-4 xl:gap-6">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/" ? "text-foreground" : "text-foreground/80",
          )}
        >
          Home
        </Link>

        <Link
          href="/overview"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/overview" ? "text-foreground" : "text-foreground/80",
          )}
        >
          Overview
        </Link>

        {isAdmin && (
          <>
            <Link
              href="/admin"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/admin"
                  ? "text-foreground"
                  : "text-foreground/80",
              )}
            >
              Admin
            </Link>
          </>
        )}

        <SignOutButton className="text-base" />
        <ThemeToggle />
      </nav>
    </div>
  );
}
