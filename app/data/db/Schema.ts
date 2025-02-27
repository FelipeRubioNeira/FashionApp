import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

const ClothingTable = sqliteTable("Clothing", {
    clo_id: int("clo_id").primaryKey({ autoIncrement: true }),
    clo_uri: text("clo_uri").notNull(),
    clo_name: text("clo_name").notNull(),
    clo_type: text("clo_type").notNull(),
    clo_style: text("clo_style").notNull(),
})

export {
    ClothingTable
}