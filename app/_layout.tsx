import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from './context/AuthContext';

function RootLayoutNav() {
  const { user } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(authenticated)";

    if (!user && inAuthGroup) {
      
      router.replace("/login");
    } else if (user && !inAuthGroup) {
      
      router.replace("/(authenticated)/(tabs)");
    }
  }, [user, segments]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

{/* <Stack>
<Stack.Screen name="index" options={{ headerShown: false }}/>
<Stack.Screen name="login" options={{ headerShown: false }}/>
<Stack.Screen name="register" options={{ headerShown: false }}/>
<Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
</Stack> */}