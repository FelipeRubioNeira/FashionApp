import "reflect-metadata";
import { Stack } from 'expo-router';
import useIntializeDatabase from "./data/db/InitializeDatabase";


const MainLayout = () => {

  const { success } = useIntializeDatabase()

  if (success) {
    return (
      <Stack screenOptions={{ headerShown: false }} />
    );
  }

  return null
}


export default MainLayout