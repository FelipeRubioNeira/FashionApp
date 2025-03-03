import { Stack } from "expo-router"

const OutfitsStack = () => {

    return (
        <Stack screenOptions={{ headerShown: false }}>

            <Stack.Screen
                name="myOutfitsScreen"
                options={{ title: "Mis outfits" }}
            />

            <Stack.Screen
                name="editOutfitScreen"
                options={{ title: "Editar outfit" }}
            />

        </Stack>
    )

}

export default OutfitsStack