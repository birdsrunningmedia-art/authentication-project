import {
  integer,
  pgTable,
  varchar,
  pgEnum,
  timestamp
} from "drizzle-orm/pg-core";

export const userRoles = ["admin", "user"] as const
export type UserRole = (typeof userRoles)[number]
export const userRoleEnum = pgEnum("user_roles", userRoles)

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }),

  email: varchar("email", { length: 255 }).notNull().unique(),

  password: varchar("hashed_password", { length: 255 }).notNull(),

  role: userRoleEnum("role").notNull().default("user"),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});