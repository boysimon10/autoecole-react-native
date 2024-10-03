import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="login" options={{ headerShown: false }}/>
      <Stack.Screen name="register" options={{ headerShown: false }}/>
      <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
    </Stack>
  );
}