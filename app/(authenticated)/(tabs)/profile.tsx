import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useRouter } from "expo-router";
import { 
    CogIcon, 
    ArrowRightOnRectangleIcon
} from "react-native-heroicons/outline";
import { useAuth } from '../../context/AuthContext';

const API_URL = 'http://10.0.2.2:5000'; 


type ProfileData = {
    username: string;
    email: string;
    
};

export default function Profile() {
    const router = useRouter();
    const headerHeight = useHeaderHeight();
    const { logout, user } = useAuth();
    const [profileData, setProfileData] = useState<ProfileData | null>(null);

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            const response = await fetch(`${API_URL}/user/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': `${user?.token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch profile data');
            }

            const data: ProfileData = await response.json();
            setProfileData(data);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            router.replace('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const menuItems = [
        {
            icon: <CogIcon size={24} color="#0072FF" />,
            title: "Paramètres",
            subtitle: "Gérer mon compte",
        }
    ];

    return (
        <View className="bg-white flex-1" style={{ paddingTop: headerHeight }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* En-tête du profil */}
                <View className="items-center pt-6 pb-8 px-4">
                    <View className="bg-gray-200 rounded-full p-1 mb-4">
                        <Image
                            source={{ uri: `https://ui-avatars.com/api/?name=${profileData?.username || 'User'}&background=0072FF&color=fff` }}
                            className="w-24 h-24 rounded-full"
                        />
                    </View>
                    <Text className="text-2xl font-bold mb-1">{profileData?.username || 'Chargement...'}</Text>
                    <Text className="text-gray-600 mb-4">{profileData?.email || 'Chargement...'}</Text>
                    <TouchableOpacity 
                        className="bg-[#0072FF] py-2 px-6 rounded-full"
                    >
                        <Text className="text-white font-semibold">Éditer le profil</Text>
                    </TouchableOpacity>
                </View>

                {/* Menu items */}
                <View className="p-4">
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            className="flex-row items-center py-4 border-b border-gray-100"
                        >
                            <View className="mr-4">
                                {item.icon}
                            </View>
                            <View className="flex-1">
                                <Text className="text-lg font-semibold">{item.title}</Text>
                                <Text className="text-gray-600">{item.subtitle}</Text>
                            </View>
                            <ArrowRightOnRectangleIcon size={20} color="#9CA3AF" />
                        </TouchableOpacity>
                    ))}

                    {/* Bouton de déconnexion */}
                    <TouchableOpacity
                        className="flex-row items-center py-4 mt-4"
                        onPress={handleLogout}
                    >
                        <ArrowRightOnRectangleIcon size={24} color="#EF4444" />
                        <Text className="ml-4 text-red-500 font-semibold text-lg">
                            Se déconnecter
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}