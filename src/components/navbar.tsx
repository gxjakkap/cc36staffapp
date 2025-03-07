"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SignOutButton } from "@/components/sign-out-button";
import { cn } from "@/lib/utils";

import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

interface NavbarProps {
  isAdmin?: boolean;
}

const NAVBARS = [
  { href: "/", text: "หน้าหลัก" },
  { href: "/nongs", text: "ข้อมูลส่วนตัว" },
  { href: "/thabians", text: "คำถามทะเบียน" },
  { href: "/wichakans", text: "คำถามวิชาการ" },
  { href: "/change-password", text: "เปลี่ยนรหัสผ่าน" },
];

export function Navbar({ isAdmin }: NavbarProps) {
  const pathname = usePathname();

  return (
    <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex border-b px-10 py-4 backdrop-blur">
      <nav className="flex w-full items-center justify-end gap-4 xl:gap-6">
        {NAVBARS.map(({ href, text }) => (
          <Link key={href} href={href}>
            <Button
              className={cn(
                "text-sm transition-colors",
                pathname === href || pathname.startsWith(href + "/")
                  ? "text-destructive font-bold hover:text-red-500"
                  : "text-foreground/80",
              )}
              variant="ghost"
            >
              {text}
            </Button>
          </Link>
        ))}

        {isAdmin && (
          <NavbarChild
            href="/admin"
            text="แอดมิน"
            isActive={pathname === "/admin"}
          />
        )}

        <SignOutButton />
        <ThemeToggle />
      </nav>
    </div>
  );
}

const NavbarChild = ({
  href,
  text,
  isActive,
}: {
  href: string;
  text: string;
  isActive: boolean;
}) => (
  <Link
    href={href}
    className={cn(
      "text-sm transition-colors",
      isActive ? "text-destructive font-bold" : "text-foreground/80",
    )}
  >
    {text}
  </Link>
);
