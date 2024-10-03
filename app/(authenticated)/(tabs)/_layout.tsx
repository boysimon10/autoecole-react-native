import CustomHeader from "@/components/CustomHeader";
import { Tabs } from "expo-router";
import { HomeIcon, BookOpenIcon, QuestionMarkCircleIcon, UserCircleIcon } from "react-native-heroicons/outline";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0072FF",
        tabBarInactiveTintColor: "#B0C4DE",
        headerTransparent: true,
        headerShadowVisible: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <HomeIcon size={size} color={color} />
          ),
          header: () => <CustomHeader />,
        }}
      />

      <Tabs.Screen
        name="courses"
        options={{
          title: 'Cours',
          tabBarIcon: ({ color, size }) => (
            <BookOpenIcon size={size} color={color} />
          ),
          header: () => <CustomHeader />,
        }}
      />

      <Tabs.Screen
        name="quizz"
        options={{
          title: 'Quizz',
          tabBarIcon: ({ color, size }) => (
            <QuestionMarkCircleIcon size={size} color={color} />
          ),
          header: () => <CustomHeader />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <UserCircleIcon size={size} color={color} />
          ),
          header: () => <CustomHeader />,
        }}
      />
    </Tabs>
  );
}