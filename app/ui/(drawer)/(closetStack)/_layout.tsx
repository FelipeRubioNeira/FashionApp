import { Stack } from "expo-router";

const ClosetStack = () => {
    
    return (
        <Stack screenOptions={{ headerShown: false }}>

            <Stack.Screen
                name="myClosetScreen"
                options={{ title: "Mi Closet" }}
            />
            <Stack.Screen
                name="addClothing"
                options={{ title: "Agregar prenda" }}
            />
        </Stack>
    )
}

export default ClosetStack