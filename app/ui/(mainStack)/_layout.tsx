import { Stack } from "expo-router";
import { FONT_FILES } from '../constants/fonts';
import { useFonts } from 'expo-font';



const MainStack = () => {

    const [fontsLoaded] = useFonts(FONT_FILES);
    if (!fontsLoaded) return null

    return (
        <Stack screenOptions={{ headerShown: false }}>

            <Stack.Screen
                name="/ui/(mainStack)"
                options={{ title: "Seleccionar idioma" }}
            />

            <Stack.Screen
                name="/ui/(mainStack)/(drawer)"
                options={{ title: "Menu principal" }}
            />

        </Stack>
    )
}

export default MainStack