import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { DBConstants } from './DBConstants';


class InitializeDrizzeDB {
    execute() {
        const expo = SQLite.openDatabaseSync(DBConstants.DB_NAME);
        const db = drizzle(expo);
        return db
    }
}

export default InitializeDrizzeDB;