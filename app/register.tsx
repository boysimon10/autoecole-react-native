import React from 'react';
import { StatusBar } from "expo-status-bar";
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from "react-native-heroicons/mini";

export default function Register() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      {/* Header fixe */}
      <View className="h-auto pb-2" style={{ paddingTop: top }}>
        <View className="mx-4 mt-2 flex flex-row items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="rounded-full p-1 mr-3 border border-[#0072FF]"
          >
            <ChevronLeftIcon size={30} color="#0072FF"/>
          </TouchableOpacity>
        </View>
      </View>
      
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        keyboardOpeningTime={0}
        extraHeight={Platform.OS === "ios" ? 180 : 200}
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-6"
      >
        <Text className="text-2xl font-bold text-center mb-8">
          Inscription
        </Text>
        
        <Image
          source={require("../assets/images/city-driver-cuate.png")}
          className="w-full h-36 object-cover mb-4"
        />
        
        {/* Champ username */}
        <View className="mb-4">
          <Text className="text-gray-700 mb-2">Pseudo</Text>
          <TextInput
            className="border border-gray-300 rounded-full px-4 py-2 text-gray-900"
            placeholder="Pseudo"
            keyboardType="default"
            autoCapitalize="none"
          />
        </View>
        
        {/* Champ email */}
        <View className="mb-4">
          <Text className="text-gray-700 mb-2">Email</Text>
          <TextInput
            className="border border-gray-300 rounded-full px-4 py-2 text-gray-900"
            placeholder="Entrez votre email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        {/* Champ mot de passe */}
        <View className="mb-6">
          <Text className="text-gray-700 mb-2">Mot de passe</Text>
          <TextInput
            className="border border-gray-300 rounded-full px-4 py-2 text-gray-900"
            placeholder="Entrez votre mot de passe"
            secureTextEntry
          />
        </View>
        
        {/* Bouton de connexion */}
        <TouchableOpacity
          className="bg-[#0072FF] p-4 rounded-full items-center mb-4"
        >
          <Text className="text-white text-lg font-semibold">S'inscrire</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}