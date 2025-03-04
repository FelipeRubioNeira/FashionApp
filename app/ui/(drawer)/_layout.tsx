import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from '@/store/Store';

const DrawerLayout = () => {
    return (
        <Provider store={store}>

            <GestureHandlerRootView style={{ flex: 1 }}>
                <Drawer screenOptions={{ title: "Mi Closet", drawerItemStyle: { display: 'none' } }}>

                    <Drawer.Screen
                        name="(closetStack)"
                        options={{
                            title: "Mi closet",
                            drawerItemStyle: { display: 'flex' }
                        }}
                    />

                    <Drawer.Screen
                        name="(outfitsStack)"
                        options={{
                            title: "Mis outfits",
                            drawerItemStyle: { display: 'flex' }
                        }}
                    />


                </Drawer>
            </GestureHandlerRootView>
        </Provider>
    );
}

export default DrawerLayout