import { setLanguage } from 'app/store/LanguageSlice';
import { Drawer } from 'expo-router/drawer';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import { container } from 'tsyringe';
import { Translation, TranslationKeys } from '@/ui/i18n';

const translation = container.resolve(Translation);



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
                        title: translation.translate(TranslationKeys.myClosetMenu),
                        drawerItemStyle: { display: 'flex' }
                    }}
                />

                <Drawer.Screen
                    name="(outfitsStack)"
                    options={{
                        title: translation.translate(TranslationKeys.myOutfitsMenu),
                        drawerItemStyle: { display: 'flex' }
                    }}
                />


            </Drawer>
        </GestureHandlerRootView>

    );
}

export default DrawerLayout