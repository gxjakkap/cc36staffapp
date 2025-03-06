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
    score1_user1: integer(),
    score1_user2: integer(),
    score2_user1: integer(),
    score2_user2: integer(),
    score3_user1: integer(),
    score3_user2: integer(),
    score4_user1: integer(),
    score4_user2: integer(),
    score5_user1: integer(),
    score5_user2: integer(),
    score6_1_user1: integer(),
    score6_1_user2: integer(),
    score6_2_user1: integer(),
    score6_2_user2: integer(),
    info_status: text().default("undone"),
    info_staffUsername: text(),
    score1_user1_staffUsername: text(),
    score1_user2_staffUsername: text(),
    score2_user1_staffUsername: text(),
    score2_user2_staffUsername: text(),
    score3_user1_staffUsername: text(),
    score3_user2_staffUsername: text(),
    score4_user1_staffUsername: text(),
    score4_user2_staffUsername: text(),
    score5_user1_staffUsername: text(),
    score5_user2_staffUsername: text(),
    score6_1_user1_staffUsername: text(),
    score6_1_user2_staffUsername: text(),
    score6_2_user1_staffUsername: text(),
    score6_2_user2_staffUsername: text(),
    updatedAt_info: timestamp("updatedAt_info", { mode: "date" }),
    updatedAt_score1_user1: timestamp("updatedAt_score1_user1", {
      mode: "date",
    }),
    updatedAt_score1_user2: timestamp("updatedAt_score1_user2", {
      mode: "date",
    }),
    updatedAt_score2_user1: timestamp("updatedAt_score2_user1", {
      mode: "date",
    }),
    updatedAt_score2_user2: timestamp("updatedAt_score2_user2", {
      mode: "date",
    }),
    updatedAt_score3_user1: timestamp("updatedAt_score3_user1", {
      mode: "date",
    }),
    updatedAt_score3_user2: timestamp("updatedAt_score3_user2", {
      mode: "date",
    }),
    updatedAt_score4_user1: timestamp("updatedAt_score4_user1", {
      mode: "date",
    }),
    updatedAt_score4_user2: timestamp("updatedAt_score4_user2", {
      mode: "date",
    }),
    updatedAt_score5_user1: timestamp("updatedAt_score5_user1", {
      mode: "date",
    }),
    updatedAt_score5_user2: timestamp("updatedAt_score5_user2", {
      mode: "date",
    }),
    updatedAt_score6_1_user1: timestamp("updatedAt_score6_1_user1", {
      mode: "date",
    }),
    updatedAt_score6_1_user2: timestamp("updatedAt_score6_1_user2", {
      mode: "date",
    }),
    updatedAt_score6_2_user1: timestamp("updatedAt_score6_2_user1", {
      mode: "date",
    }),
    updatedAt_score6_2_user2: timestamp("updatedAt_score6_2_user2", {
      mode: "date",
    }),
  },
  (table) => [
    uniqueIndex("Tabian_userId_idx").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops"),
    ),
  ],
);
