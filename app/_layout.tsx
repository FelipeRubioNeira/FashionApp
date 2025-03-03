import "reflect-metadata";
import useIntializeDatabase from "./data/db/InitializeDatabase";
import { Slot } from "expo-router";


const MainLayout = () => {

  const { success } = useIntializeDatabase()

  if (success) {
    return <Slot/>
  }

  return null
}


export default MainLayout