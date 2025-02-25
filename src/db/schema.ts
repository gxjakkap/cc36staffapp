import { sql } from "drizzle-orm";
import {
  boolean,
  foreignKey,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const prismaMigrations = pgTable("_prisma_migrations", {
  id: varchar({ length: 36 }).primaryKey().notNull(),
  checksum: varchar({ length: 64 }).notNull(),
  finishedAt: timestamp("finished_at", { withTimezone: true, mode: "string" }),
  migrationName: varchar("migration_name", { length: 255 }).notNull(),
  logs: text(),
  rolledBackAt: timestamp("rolled_back_at", {
    withTimezone: true,
    mode: "string",
  }),
  startedAt: timestamp("started_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const file = pgTable(
  "File",
  {
    id: text().primaryKey().notNull(),
    userId: text().notNull(),
    facePhotoFilepath: text("face_photo_filepath"),
    thaiNationalidCopyFilepath: text("thai_nationalid_copy_filepath"),
    parentPermissionFilepath: text("parent_permission_filepath"),
    p1Filepath: text("p1_filepath"),
    p7Filepath: text("p7_filepath"),
  },
  (table) => [
    index("File_userId_idx").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops"),
    ),
    uniqueIndex("File_userId_key").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops"),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "File_userId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ],
);

export const answerRegis = pgTable(
  "AnswerRegis",
  {
    id: text().primaryKey().notNull(),
    userId: text().notNull(),
    answer1: text(),
    answer2: text(),
    answer3: text(),
    answer4: text(),
    answer5: text(),
    answer61: text("answer6_1"),
    answer62: text("answer6_2"),
  },
  (table) => [
    index("AnswerRegis_userId_idx").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops"),
    ),
    uniqueIndex("AnswerRegis_userId_key").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops"),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "AnswerRegis_userId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ],
);

export const answerAcademic = pgTable(
  "AnswerAcademic",
  {
    id: text().primaryKey().notNull(),
    userId: text().notNull(),
    algoAnswer: text("algo_answer"),
    chessNotation: text("chess_notation"),
    chessScore: integer("chess_score"),
  },
  (table) => [
    index("AnswerAcademic_userId_idx").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops"),
    ),
    uniqueIndex("AnswerAcademic_userId_key").using(
      "btree",
      table.userId.asc().nullsLast().op("text_ops"),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "AnswerAcademic_userId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ],
);

export const user = pgTable(
  "User",
  {
    id: text().primaryKey().notNull(),
    googleId: text("google_id").notNull(),
    fullname: text(),
    age: integer(),
    birth: timestamp({ precision: 3, mode: "string" }),
    gender: text(),
    religion: text(),
    bloodGroup: text("blood_group"),
    graduation: text(),
    school: text(),
    course: text(),
    telephone: text(),
    email: text().notNull(),
    medicalCoverage: text("medical_coverage"),
    chronicDisease: text("chronic_disease"),
    selfMedicine: text("self_medicine"),
    drugAllergic: text("drug_allergic"),
    foodAllergic: text("food_allergic"),
    address: text(),
    homePhoneTel: text("home_phone_tel"),
    comcampAttendance: boolean("comcamp_attendance"),
    shirtSize: text("shirt_size"),
    hasLaptop: boolean("has_laptop"),
    travel: text(),
    parentFullname: text("parent_fullname"),
    parentRelation: text("parent_relation"),
    parentPhone: text("parent_phone"),
    academicDone: boolean("academic_done").default(false).notNull(),
    filesDone: boolean("files_done").default(false).notNull(),
    infoDone: boolean("info_done").default(false).notNull(),
    regisDone: boolean("regis_done").default(false).notNull(),
    title: text(),
    preferFood: text("prefer_food"),
    everydayAttendance: boolean("everyday_attendance"),
    hasSubmitAnswer: boolean("has_submit_answer").default(false).notNull(),
  },
  (table) => [
    uniqueIndex("User_email_key").using(
      "btree",
      table.email.asc().nullsLast().op("text_ops"),
    ),
    uniqueIndex("User_google_id_key").using(
      "btree",
      table.googleId.asc().nullsLast().op("text_ops"),
    ),
  ],
);

export const session = pgTable("Session", {
  sid: text().primaryKey().notNull(),
  userId: text("user_id").notNull(),
  expire: timestamp({ precision: 6, mode: "string" }).notNull(),
});
