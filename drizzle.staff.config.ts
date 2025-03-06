import "dotenv/config";

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle-staff",
  schema: "./src/db/staff-schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: `postgresql://postgres:${process.env.STAFFAPP_POSTGRES_PASSWORD}@${process.env.STAFFAPP_POSTGRES_HOST}:5432/postgres`!,
  },
});
