import { injectable } from "tsyringe";
import * as SQLite from 'expo-sqlite';
import { drizzle, ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { DBConstants } from "./DBConstants";
import { migrate } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from "../../../drizzle/migrations";


@injectable()
class DbConnection {

    public db: ExpoSQLiteDatabase;

    constructor() {
        const expo = SQLite.openDatabaseSync(DBConstants.DB_NAME);
        this.db = drizzle(expo);

        this.applyMigrations(this.db)

    }

    private async applyMigrations(db: ExpoSQLiteDatabase) {
        await migrate(db, migrations); // Replace with the actual migration files.
    }
}

export default DbConnection