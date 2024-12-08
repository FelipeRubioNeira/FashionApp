import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
  return (

    <Stack screenOptions={{ headerShown: false }}>

      {/* --------------- pantallas hijos  --------------- */}
      <Stack.Screen name="index" />
      <Stack.Screen name="details" />

    </Stack>
  );

}

export default Layout

