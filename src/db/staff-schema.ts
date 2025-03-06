import { sql } from "drizzle-orm";
import {
  boolean,
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
    scoreAcademic: integer(),
    scoreChess: integer(),
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
  ],
);

export const tabian = pgTable(
  "Tabian",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    userId: text().notNull(),
    info: boolean(),
    score1: integer(),
    score2: integer(),
    score3: integer(),
    score4: integer(),
    score5: integer(),
    score6_1: integer(),
    score6_2: integer(),
    status: text().default("unlock").notNull(),
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
  ],
);
