import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  Platform,
  Alert,
} from 'react-native';
import { StatusBar } from "expo-status-bar";
import { useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAuth } from './context/AuthContext'; 

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLoginPress = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    try {
      await login(email, password);
      router.push('/(authenticated)/(tabs)');
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert("Erreur de connexion", "Identifiants incorrects ou problème de réseau");
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        keyboardOpeningTime={0}
        extraHeight={Platform.OS === "ios" ? 180 : 200}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 justify-center p-6">
          <Text className="text-2xl font-bold text-center mb-8">
            Connexion
          </Text>
          
          <Image
            source={require("../assets/images/city-driver-cuate.png")}
            className="w-full h-36 object-cover mb-4"
          />
          
          <View className="mb-4">
            <Text className="text-gray-700 mb-2">Email</Text>
            <TextInput
              className="border border-gray-300 rounded-full px-4 py-2 text-gray-900"
              placeholder="Entrez votre email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          
          <View className="mb-6">
            <Text className="text-gray-700 mb-2">Mot de passe</Text>
            <TextInput
              className="border border-gray-300 rounded-full px-4 py-2 text-gray-900"
              placeholder="Entrez votre mot de passe"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          
          <TouchableOpacity
            className="bg-[#0072FF] p-4 rounded-full items-center"
            onPress={handleLoginPress}
          >
            <Text className="text-white text-lg font-semibold">Connexion</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="mt-4"
            onPress={() => router.push('/register')}
          >
            <Text className="text-[#0072FF] text-center">S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}