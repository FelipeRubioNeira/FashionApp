import "reflect-metadata"; // se agrega para el uso de tsyringe (dependency inyection)
import { Stack } from 'expo-router';
import useIntializeDatabase from './data/db/InitializeDatabase';
import { useEffect } from 'react';



export default function MainLayout() {


  // --------------- hooks --------------- //
  const { initializeDatabase } = useIntializeDatabase();

  useEffect(() => {
    initializeDatabase()
  }, [])


  return (
    <Stack initialRouteName="index" >
      <Stack.Screen name="index" options={{ headerShown: true, title: 'Mi closet' }} />
    </Stack>
  );
}


