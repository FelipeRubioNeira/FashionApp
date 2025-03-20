import { Stack } from "expo-router";

const MainStack = () => {

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