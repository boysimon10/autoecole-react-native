import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { PlusIcon, AcademicCapIcon, ClockIcon } from "react-native-heroicons/mini";
import { useRouter } from "expo-router";
import CourseCard from '@/components/CourseCard';

export default function index() {
    const router = useRouter();
    const headerHeight = useHeaderHeight();

    const featuredQuizzes = [
        {
            id: '1',
            title: "Quiz du jour",
            description: "Testez vos connaissances quotidiennes",
            image: "https://evs-strapi-images-prod.imgix.net/Illus_fc_Ensemble_panneaux_danger_30c5e11be4.png?w=3840&q=75"
        },
        {
            id: '2',
            title: "Quiz rapide",
            description: "5 questions en 5 minutes",
            image: "https://cdn.prod.website-files.com/6413856d54d41b5f298d5953/64c928999fe70183d726b9db_depassement-intersection.png"
        }
    ];

    return (
        <View className="bg-white flex-1" style={{ paddingTop: headerHeight }}>
            <ScrollView showsVerticalScrollIndicator={false} className="p-4">
                {/* En-tête avec salutation */}
                <View className="mb-6">
                    <Text className="text-2xl font-bold">Bonjour 👋</Text>
                    <Text className="text-gray-600">Prêt à apprendre aujourd'hui ?</Text>
                </View>

                {/* Section Quiz en vedette */}
                <View className="mb-6">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-semibold">Quiz en vedette</Text>
                        <TouchableOpacity onPress={() => router.push("/quizz")}>
                            <Text className="text-[#0072FF]">Voir tout</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {featuredQuizzes.map((quiz) => (
                            <TouchableOpacity 
                                key={quiz.id}
                                className="mr-4 bg-gray-50 rounded-xl overflow-hidden"
                                style={{ width: 200 }}
                                onPress={() => router.push(`/(authenticated)/quizz/${quiz.id}`)}
                            >
                                <Image 
                                    source={{ uri: quiz.image }}
                                    className="w-full h-24"
                                />
                                <View className="p-3">
                                    <Text className="font-semibold mb-1">{quiz.title}</Text>
                                    <Text className="text-gray-600 text-sm">{quiz.description}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Section Cours */}
                <View className="mb-6">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-semibold">Cours disponibles</Text>
                        <TouchableOpacity onPress={() => router.push("/courses")}>
                            <Text className="text-[#0072FF]">Voir tout</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => router.push("/(authenticated)/course/1")} >
                        <CourseCard
                            title="La Signalisation Routière"
                            description="Apprenez tous les panneaux et leur signification"
                            cover="https://evs-strapi-images-prod.imgix.net/Illus_fc_Ensemble_panneaux_danger_30c5e11be4.png?w=3840&q=75"
                        />
                    </TouchableOpacity>
                </View>

                {/* Statistiques rapides */}
                <View className="flex-row justify-between mb-6">
                    <View className="bg-gray-50 p-4 rounded-xl flex-1 mr-2">
                        <AcademicCapIcon size={24} color="#0072FF" />
                        <Text className="text-2xl font-bold mt-2">12</Text>
                        <Text className="text-gray-600">Quiz complétés</Text>
                    </View>
                    <View className="bg-gray-50 p-4 rounded-xl flex-1 ml-2">
                        <ClockIcon size={24} color="#0072FF" />
                        <Text className="text-2xl font-bold mt-2">45min</Text>
                        <Text className="text-gray-600">Temps d'étude</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}