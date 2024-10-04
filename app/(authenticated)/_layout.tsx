import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="course/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="quizz/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="courseQuizz/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
