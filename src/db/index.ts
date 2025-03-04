import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});
export const db = drizzle({ client: pool });

const staffPool = new Pool({
  connectionString: `postgresql://postgres:${process.env.STAFFAPP_POSTGRES_PASSWORD}@${process.env.STAFFAPP_POSTGRES_HOST}:5432/postgres`,
});
export const dbStaff = drizzle({ client: staffPool });
