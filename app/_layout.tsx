import "reflect-metadata";
import useIntializeDatabase from "./data/db/InitializeDatabase";
import { Slot } from "expo-router";
import { Provider } from 'react-redux';
import { store } from 'app/store/Store';

const MainLayout = () => {

  const { success } = useIntializeDatabase()

  if (success) {
    return (
      <Provider store={store}>
        <Slot />
      </Provider>
    )
  }

  return null
}


export default MainLayout