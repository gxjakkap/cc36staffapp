import "../globals.css";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { auth } from "@/lib/auth";

export default async function AuthorizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="relative antialiased flex flex-col bg-neutral-100 min-h-screen">
      <Navbar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
