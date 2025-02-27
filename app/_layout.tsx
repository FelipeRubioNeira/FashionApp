import "reflect-metadata"; // se agrega para el uso de tsyringe (dependency inyection)
import { Stack } from 'expo-router';
import Colors from "./ui/constants/colors";
import useIntializeDatabase from "./data/db/InitializeDatabase";


const MainLayout = () => {

  const { success } = useIntializeDatabase()

  
  if (success) {
    return (
      <Stack initialRouteName="index" >
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            title: 'Mi closet',
            headerStyle: {
              backgroundColor: Colors.GRAY,
            }
          }} />
      </Stack>
    );
  }

  return null
}


export default MainLayout