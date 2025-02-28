import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from '@/store/Store';

const DrawerLayout = () => {
    return (

        <Provider store={store}>

            <GestureHandlerRootView style={{ flex: 1 }}>
                <Drawer screenOptions={{ drawerItemStyle: { display: 'none' } }}>

                    <Drawer.Screen
                        name="screens/myCloset/index"
                        options={{
                            title: "Mi closet",
                            drawerItemStyle: { display: 'flex' }
                        }}
                    />

                    <Drawer.Screen
                        name="screens/myOutfits/index"
                        options={{
                            title: "Mis outfits",
                            drawerItemStyle: { display: 'flex' }
                        }}
                    />

                    <Drawer.Screen
                        name="screens/addClothingScreen/index"
                        options={{
                            title: "Agregar prenda",
                            drawerItemStyle: { display: 'flex' }
                        }}
                    />
                </Drawer>
            </GestureHandlerRootView>
        </Provider>
    );
}

export default DrawerLayout