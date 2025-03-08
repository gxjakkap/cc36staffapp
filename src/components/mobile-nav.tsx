"use client";

import { useCallback, useState } from "react";
import Link, { type LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";

import { NAVBARS } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isAdmin?: boolean;
}

export function MobileNav({ isAdmin }: MobileNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const onOpenChange = useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80svh] p-0">
        <VisuallyHidden asChild>
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
          </DrawerHeader>
        </VisuallyHidden>
        <div className="overflow-auto p-6">
          <div className="flex flex-col space-y-1">
            {NAVBARS.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                    isActive={
                      pathname === item.href ||
                      pathname.startsWith(item.href + "/")
                    }
                  >
                    {item.text}
                  </MobileLink>
                ),
            )}
            {isAdmin && (
              <MobileLink
                href="/admin"
                onOpenChange={setOpen}
                isActive={
                  pathname === "/admin" || pathname.startsWith("/admin/")
                }
              >
                แอดมิน
              </MobileLink>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  isActive: boolean;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  isActive,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(
        "flex items-center rounded-md px-4 py-3 text-[1.1rem] transition-all duration-200",
        isActive
          ? "text-primary bg-primary/10 border-primary border-l-4 font-semibold"
          : "text-foreground/80 hover:bg-accent/50",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
