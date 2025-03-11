"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import Link, { type LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";

import { THABIANS_NAV } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { StaffRoles } from "@/lib/auth/role";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isAdmin?: boolean;
  role?: string | null;
}

const ThabianNavItems = ({
  pathname,
  setOpen,
}: {
  pathname: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      {THABIANS_NAV.map(({ href, text }) => (
        <MobileLink
          key={href}
          href={href}
          onOpenChange={setOpen}
          isActive={pathname === href || pathname.startsWith(href + "/")}
        >
          {text}
        </MobileLink>
      ))}
    </>
  );
};

export function MobileNav({ isAdmin, role }: MobileNavProps) {
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
            <MobileLink
              key="/"
              href="/"
              onOpenChange={setOpen}
              isActive={pathname === "/"}
            >
              หน้าหลัก
            </MobileLink>

            {!!role &&
              (role === StaffRoles.REGIS || role === StaffRoles.ADMIN) && (
                <ThabianNavItems pathname={pathname} setOpen={setOpen} />
              )}
            {!!role &&
              (role === StaffRoles.ACADEMIC || role === StaffRoles.ADMIN) && (
                <MobileLink
                  key="/wichakans"
                  href="/wichakans"
                  onOpenChange={setOpen}
                  isActive={
                    pathname === "/wichakans" ||
                    pathname.startsWith("/wichakans" + "/")
                  }
                >
                  คำถามวิชาการ
                </MobileLink>
              )}

            <MobileLink
              key="/change-password"
              href="/change-password"
              onOpenChange={setOpen}
              isActive={
                pathname === "/change-password" ||
                pathname.startsWith("/change-password" + "/")
              }
            >
              เปลี่ยนรหัสผ่าน
            </MobileLink>

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
