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
    <div className="flex py-4 px-10 border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="flex justify-end w-full items-center gap-4 xl:gap-6">
        <Link
          href="/"
          className={cn(
            "text-sm transition-colors hover:text-foreground/80",
            pathname === "/" ? "text-foreground" : "text-foreground/80",
          )}
        >
          Overview
        </Link>

        <Link
          href="/nongs"
          className={cn(
            "text-sm transition-colors hover:text-foreground/80",
            pathname.includes("/nongs")
              ? "font-bold text-destructive"
              : "text-foreground/80",
          )}
        >
          น้องๆ
        </Link>

        <Link
          href="/thabians"
          className={cn(
            "text-sm transition-colors hover:text-foreground/80",
            pathname.includes("/thabians")
              ? "font-bold text-destructive"
              : "text-foreground/80",
          )}
        >
          ทะเบียน
        </Link>

        <Link
          href="/wichakans"
          className={cn(
            "text-sm transition-colors hover:text-foreground/80",
            pathname.includes("/wichakans")
              ? "font-bold text-destructive"
              : "text-foreground/80",
          )}
        >
          วิชาการ
        </Link>

        {isAdmin && (
          <Link
            href="/admin"
            className={cn(
              "text-sm transition-colors hover:text-foreground/80",
              pathname === "/admin" ? "text-foreground" : "text-foreground/80",
            )}
          >
            Admin
          </Link>
        )}

        <SignOutButton />
        <ThemeToggle />
      </nav>
    </div>
  );
}
