import { injectable } from "tsyringe";
import { Outfit } from "../domain/Types";
import IOutfitRepository from "./interfaces/IOutfitRepository";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import DbConnection from "./db/DbConnection";
import { OutfitTable } from "./db/Schema";


@injectable()
class OutfitSqliteRepository implements IOutfitRepository {

    private db: ExpoSQLiteDatabase;

    constructor(private dbConnection: DbConnection) {
        this.db = this.dbConnection.db
    }

    private logError(method: string, error: unknown) {
        console.log(`Ha ocurrido un error en ${this.constructor.name}, ${method}, ${error}`)
    }

    async save({ name, topClothing, bottomClothing, shoes }: Outfit): Promise<boolean> {

        try {

            const response = await this.db.insert(OutfitTable)
                .values({
                    out_name: name,
                    out_top_id: topClothing.id,
                    out_btn_id: bottomClothing.id,
                    out_sho_id: shoes.id
                })

            return !!response.lastInsertRowId

        } catch (error) {
            this.logError("save()", error)
            return false
        }

    }
}

export default OutfitSqliteRepository