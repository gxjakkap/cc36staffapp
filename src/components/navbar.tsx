"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";

import { MobileNav } from "@/components/mobile-nav";
import { SignOutButton } from "@/components/sign-out-button";
import { cn } from "@/lib/utils";

import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

interface NavbarProps {
  isAdmin?: boolean;
}

export const NAVBARS = [
  { href: "/", text: "หน้าหลัก" },
  { href: "/nongs", text: "ข้อมูลส่วนตัว" },
  { href: "/thabians", text: "คำถามทะเบียน" },
  { href: "/wichakans", text: "คำถามวิชาการ" },
  { href: "/change-password", text: "เปลี่ยนรหัสผ่าน" },
];

export function Navbar({ isAdmin }: NavbarProps) {
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex border-b px-6 py-3 shadow-sm backdrop-blur">
        <nav className="flex w-full items-center justify-between">
          <div className="flex items-center">
            {NAVBARS.map(({ href, text }) => (
              <NavbarChild
                key={href}
                href={href}
                text={text}
                isActive={pathname === href || pathname.startsWith(href + "/")}
              />
            ))}

            {isAdmin && (
              <NavbarChild
                href="/admin"
                text="แอดมิน"
                isActive={
                  pathname === "/admin" || pathname.startsWith("/admin/")
                }
              />
            )}
          </div>

          <div className="flex items-center gap-3">
            <SignOutButton />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    );
  }
  return (
    <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex border-b px-4 py-3 shadow-sm backdrop-blur">
      <nav className="flex w-full items-center justify-between">
        <MobileNav isAdmin={isAdmin} />
        <div className="flex items-center gap-2">
          <SignOutButton />
          <ThemeToggle />
        </div>
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
  <Link key={href} href={href}>
    <Button
      className={cn(
        "relative px-4 text-sm font-medium transition-all",
        isActive
          ? "text-primary before:bg-primary hover:text-primary/90 font-bold before:absolute before:bottom-0 before:left-1/2 before:h-0.5 before:w-1/2 before:-translate-x-1/2 before:transform before:content-['']"
          : "text-foreground/80 hover:text-foreground hover:bg-accent/50",
      )}
      variant="ghost"
    >
      {text}
    </Button>
  </Link>
);
