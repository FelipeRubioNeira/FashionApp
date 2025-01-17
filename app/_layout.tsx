import { Stack } from 'expo-router';
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import useIntializeDatabase from './db/InitializeDatabase';



export default function MainLayout() {


  const { initializeDatabase } = useIntializeDatabase();

  // --------------- methods --------------- //
  const onInit = async (db: SQLiteDatabase) => {
    await initializeDatabase(db);
  }


  return (

    <SQLiteProvider databaseName="moda.db" onInit={onInit}>

      <Stack initialRouteName="index" >

        <Stack.Screen name="index" options={{ headerShown: true, title: 'Mi closet' }} />
        <Stack.Screen name="clothingGallery" options={{ headerShown: true, title: 'Galeria' }} />
        <Stack.Screen name="addClothing/index" options={{ headerShown: true, title: 'Agregar Prenda' }} />

      </Stack>

    </SQLiteProvider>

  );
}


