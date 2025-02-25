import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { admin, openAPI, username } from "better-auth/plugins";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: `postgresql://postgres:${process.env.STAFFAPP_POSTGRES_PASSWORD}@${process.env.STAFFAPP_POSTGRES_HOST}:5432/postgres`,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    username(),
    nextCookies(),
    admin({
      defaultRole: "staff",
      adminRole: "admin",
    }),
  ],
});
