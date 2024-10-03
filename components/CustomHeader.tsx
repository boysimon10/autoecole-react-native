import { Text, View, TouchableOpacity, Image, StatusBar, StyleSheet } from "react-native";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/solid";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CustomHeader() {
    const { top } = useSafeAreaInsets();
  return (
    <View>
    <StatusBar
        barStyle="dark-content"
      />
    <View className="h-auto bg-white pb-4 border-b border-gray-200" style={{ paddingTop: top }}>
      <View className="mx-4 mt-2 flex-row items-center justify-between">
        <View className="flex-row">
          <Image source={require("../assets/images/imgpanneau.png")} className="w-8 h-8" />
          <Text className="ml-2 font-bold text-2xl "></Text>
        </View>
        <View className="flex-row">
          <TouchableOpacity className="bg-white shadow-md  rounded-full p-2 mr-3 border border-[#0072FF]">
            <MagnifyingGlassIcon size={25} color="#0072FF"/>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white shadow-md rounded-full p-2 border border-[#0072FF]">
            <BellIcon size={25} color="#0072FF"/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </View>
  );
}