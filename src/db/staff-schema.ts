import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const wichakarn = pgTable(
  "Wichakarn",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    userId: text().notNull(),
    scoreAcademic: integer().default(0).notNull(),
    scoreChess: integer().default(0).notNull(),
    status: text().notNull().default("unlock"),
    staffUsername: text().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" })
      .default(sql`NOW()`)
      .notNull(),
  },
  (table) => [
    uniqueIndex("Wichakarn_userId_idx").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops"),
    ),
    uniqueIndex("Wichakarn_staffUsername_idx").using(
      "btree",
      table.staffUsername.asc().nullsLast().op("text_ops"),
    ),
  ],
);

export const tabian = pgTable(
  "Tabian",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    userId: text().notNull(),
    info: text().default("ยังไม่ได้ตรวจสอบ").notNull(),
    scoreRegis: integer().default(0).notNull(),
    status: text().notNull().default("unlock").notNull(),
    staffUsername: text().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" })
      .default(sql`NOW()`)
      .notNull(),
  },
  (table) => [
    uniqueIndex("Tabian_userId_idx").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops"),
    ),
    uniqueIndex("Tabian_staffUsername_idx").using(
      "btree",
      table.staffUsername.asc().nullsLast().op("text_ops"),
    ),
  ],
);
