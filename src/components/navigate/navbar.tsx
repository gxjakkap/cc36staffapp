"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

interface NavbarProps {
  isAdmin?: boolean;
}

function Navbar({ isAdmin }: NavbarProps) {
  return (
    <NavigationMenu className="max-h-[6rem] mt-5 ml-auto">
      <NavigationMenuList className="flex gap-x-3 pr-12 text-xl">
        <NavigationMenuItem>
          <Link href="/">Home</Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/overview">Overview</Link>
        </NavigationMenuItem>
        {isAdmin && (
          <>
            <NavigationMenuItem>
              <Link href="/admin">Admin</Link>
            </NavigationMenuItem>
          </>
        )}
        <NavigationMenuItem></NavigationMenuItem>
        <NavigationMenuItem asChild>
          <ThemeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
export default Navbar;
