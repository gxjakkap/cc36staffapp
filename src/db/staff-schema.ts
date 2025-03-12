import { sql } from "drizzle-orm";
import {
  boolean,
  decimal,
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
    scoreAcademic: decimal(),
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
    score1_user1: decimal(),
    score1_user2: decimal(),
    score2_user1: decimal(),
    score2_user2: decimal(),
    score3_user1: decimal(),
    score3_user2: decimal(),
    score4_user1: decimal(),
    score4_user2: decimal(),
    score5_user1: decimal(),
    score5_user2: decimal(),
    score6_1_user1: decimal(),
    score6_1_user2: decimal(),
    score6_2_user1: decimal(),
    score6_2_user2: decimal(),
    info_status: text().default("unlock"),
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

export const remarks = pgTable(
  "remarks",
  {
    id: uuid("id").defaultRandom().notNull().primaryKey(),
    userId: text().notNull(),
    remarks: text(),
    updated_at: timestamp("updated_at").notNull(),
    added_by: text().notNull(),
  },
  (table) => [
    uniqueIndex("remarks_userId_idx").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops"),
    ),
  ],
);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  username: text("username").unique(),
  displayUsername: text("display_username"),
  role: text("role"),
  banned: boolean("banned"),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonated_by"),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
