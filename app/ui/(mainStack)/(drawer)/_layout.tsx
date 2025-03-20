import { setLanguage } from 'app/store/LanguageSlice';
import { Drawer } from 'expo-router/drawer';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';


const DrawerLayout = () => {

    // ----------- hooks ----------- //
    const dispatcher = useDispatch()



    // ----------- effects ----------- //
    useEffect(()=>{

        dispatcher(setLanguage("en"))

    },[])


    return (


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

    );
}

export default DrawerLayout