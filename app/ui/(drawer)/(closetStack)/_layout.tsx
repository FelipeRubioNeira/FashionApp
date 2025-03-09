import { Stack } from "expo-router"

const ClosetStack = () => {

    return (
        <Stack screenOptions={{ headerShown: false }}>

            <Stack.Screen
                name="myClosetScreen"
                options={{ title: "Mis outfits" }}
            />

            <Stack.Screen
                name="addClothingScreen"
                options={{ title: "Editar outfit" }}
            />

        </Stack>
    )

}

export default ClosetStack