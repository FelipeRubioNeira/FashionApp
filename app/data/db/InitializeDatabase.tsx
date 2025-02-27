import { drizzle } from 'drizzle-orm/expo-sqlite';
import { DBConstants } from './DBConstants';
import { Tables } from './TableNames';
import { SQLiteDatabase, openDatabaseAsync, openDatabaseSync } from 'expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '@/drizzle/migrations';


const expoDb = openDatabaseSync(DBConstants.DB_NAME);
const db = drizzle(expoDb);


const useIntializeDatabase = () => {

    const { success, error } = useMigrations(db, migrations);

    // --------------- return --------------- //
    return {
        success,
        error
    }

}

export default useIntializeDatabase;