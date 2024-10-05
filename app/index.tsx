import { Text, View, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter(); 

  return (
    <View className="flex-1 bg-white p-4">
      {/* Contenu central */}
      <View className="flex-1 items-center justify-center">
        <Image
          source={require("../assets/images/city-driver-cuate.png")}
          className="w-full h-48 object-cover mb-4"
        />
        <Text className="text-xl font-bold text-center mb-2">
          Fais Ton Quizz Gratuitement
        </Text>
        <Text className="text-center text-gray-600">
          Apprendre et reviser le code de la route sauve des vies.
        </Text>
      </View>

      {/* Bouton "Suivant" en bas */}
      <TouchableOpacity
        className="bg-[#0072FF] p-3 rounded-full items-center mt-4"
        onPress={() => router.push('/login')}
      >
        <Text className="text-white text-lg font-semibold">Suivant</Text>
      </TouchableOpacity>
    </View>
  );
}
