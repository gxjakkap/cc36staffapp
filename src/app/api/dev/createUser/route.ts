import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

const SUPER_KEY =
  process.env.SUPER_KEY || "default_unsafe_key_prepare_to_get_hacked";

export const POST = async (req: Request) => {
  const data = await req.json();
  const rsk = req.headers.get("Authentication") || "";

  if (!crypto.timingSafeEqual(Buffer.from(rsk), Buffer.from(SUPER_KEY))) {
    return new NextResponse(JSON.stringify({ status: 403 }));
  }

  await auth.api.createUser({
    body: {
      email: data.email,
      name: data.name,
      password: data.password,
      role: "admin",
      data: {
        username: data.username,
      },
    },
  });
  return new NextResponse(JSON.stringify({ status: 201 }));
};
