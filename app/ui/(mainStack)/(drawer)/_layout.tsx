import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { container } from 'tsyringe';
import { Translation, TranslationKeys } from '@/ui/i18n';
import { FONT_FAMILY, FONT_SIZE } from '@/ui/constants/fonts';
import { StyleSheet } from 'react-native';
import Colors from '@/ui/constants/colors';

const translation = container.resolve(Translation);



const DrawerLayout = () => {


    return (


        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer screenOptions={{
                title: "Mi Closet",
                drawerItemStyle: { display: 'none' },
                drawerLabelStyle: localStyles.drawerLabel,
                headerTitleStyle: localStyles.drawerTitle,

                headerStyle: {
                    backgroundColor: Colors.SAND, // O el color que prefieras
                },

                // Opcional: Color del texto activo
                drawerActiveBackgroundColor: Colors.SAND,
            }}>

                <Drawer.Screen
                    name="(closetStack)"
                    options={{
                        title: translation.translate(TranslationKeys.myClosetMenu),
                        drawerItemStyle: { display: 'flex' },
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

const localStyles = StyleSheet.create({
    drawerLabel: {
        fontFamily: FONT_FAMILY.PLAYFAIR_BOLD,
        fontSize: FONT_SIZE.MEDIUM,
        color: Colors.BLACK

    },
    drawerTitle: {
        fontFamily: FONT_FAMILY.PLAYFAIR_BLACK,
        fontSize: FONT_SIZE.LARGE,

    }
})

export default DrawerLayout