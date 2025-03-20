import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { InferSelectModel } from 'drizzle-orm';


// ----------- schemas ----------- //
const ClothingTable = sqliteTable("Clothing", {
    clo_id: int("clo_id").primaryKey({ autoIncrement: true }),
    clo_uri: text("clo_uri").notNull(),
    clo_name: text("clo_name").notNull(),
    clo_type: text("clo_type").notNull(),
    clo_style: text("clo_style").notNull(),
})

const OutfitTable = sqliteTable("Outfit", {
    out_id: int("out_id").primaryKey({ autoIncrement: true }),
    out_name: text("out_name").notNull(),
    out_top_id: int("out_top_id").notNull().references(() => ClothingTable.clo_id, { onDelete: "cascade" }),
    out_btn_id: int("out_btn_id").notNull().references(() => ClothingTable.clo_id, { onDelete: "cascade" }),
    out_sho_id: int("out_sho_id").notNull().references(() => ClothingTable.clo_id, { onDelete: "cascade" }),
})


// ----------- types ----------- //

type ClothingTableType = InferSelectModel<typeof ClothingTable>;
type OutfitTableType = InferSelectModel<typeof OutfitTable>;



// ----------- exports ----------- //
export {
    ClothingTable,
    OutfitTable
    // ...
}

export type {
    ClothingTableType,
    OutfitTableType
    // ...
}