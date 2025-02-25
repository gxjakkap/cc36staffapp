import { relations } from "drizzle-orm/relations";

import { answerAcademic, answerRegis, file, user } from "./schema";

export const fileRelations = relations(file, ({ one }) => ({
  user: one(user, {
    fields: [file.userId],
    references: [user.id],
  }),
}));

export const userRelations = relations(user, ({ many }) => ({
  files: many(file),
  answerRegis: many(answerRegis),
  answerAcademics: many(answerAcademic),
}));

export const answerRegisRelations = relations(answerRegis, ({ one }) => ({
  user: one(user, {
    fields: [answerRegis.userId],
    references: [user.id],
  }),
}));

export const answerAcademicRelations = relations(answerAcademic, ({ one }) => ({
  user: one(user, {
    fields: [answerAcademic.userId],
    references: [user.id],
  }),
}));
