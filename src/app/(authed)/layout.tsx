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
    <div className="antialiased flex flex-col min-h-screen">
      <Navbar isAdmin={session.user.role == "admin"} />
      <div className="mt-12 flex flex-col lg:mt-0">{children}</div>
    </div>
  );
}
