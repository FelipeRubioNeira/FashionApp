import { index, int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { Tables } from "./TableNames";

// --------------- top clothes --------------- //

const TOP_CLOTHING = sqliteTable(Tables.TOP_CLOTHING, {
  id: int().primaryKey({ autoIncrement: true }),
  uri: text().notNull(),
  type: text().notNull(),
}, (t) => [
    index('uri_index').on(t.uri)
]);

export {
    TOP_CLOTHING
}