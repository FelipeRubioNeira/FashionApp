import { Stack } from "expo-router"
import { container } from "tsyringe";
import { Translation, TranslationKeys } from "@/ui/i18n";


const translation = container.resolve(Translation);


const ClosetStack = () => {

    return (
        <Stack screenOptions={{ headerShown: false }}>

            <Stack.Screen
                name="/myClosetScreen"
                options={{ title: translation.translate(TranslationKeys.myClosetMenu) }}
            />

            <Stack.Screen
                name="/addClothingScreen"
                options={{ title: "Editar outfit" }}
            />

        </Stack>
    )

}

export default ClosetStack