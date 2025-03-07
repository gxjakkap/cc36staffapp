import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin, username } from "better-auth/plugins";

import { dbStaff } from "@/db";
import { account, session, user, verification } from "@/db/staff-schema";

import { StaffRoles } from "./auth/role";

export const auth = betterAuth({
  database: drizzleAdapter(dbStaff, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    username(),
    nextCookies(),
    admin({
      defaultRole: StaffRoles["STAFF"],
      adminRoles: StaffRoles["ADMIN"],
    }),
  ],
});
