import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';

export const requests = sqliteTable(
  'requests',
  {
    id: text('id').primaryKey(),
    ownerId: text('owner_id').notNull(),
    revision: integer('revision').notNull().default(0),
    state: text('state').notNull(),
    updatedAt: text('updated_at').notNull(),
  },
  (table) => [
    index('idx_requests_owner_updated').on(table.ownerId, table.updatedAt),
  ],
);
