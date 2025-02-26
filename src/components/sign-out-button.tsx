"use client";

import { signOutAction } from "@/app/(authed)/action";
import { Button } from "@/components/ui/button";

export function SignOutButton({
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <form action={signOutAction}>
      <Button type="submit" {...props}>
        Sign Out
      </Button>
    </form>
  );
}
