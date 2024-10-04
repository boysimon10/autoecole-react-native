import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { AcademicCapIcon, ClockIcon } from "react-native-heroicons/mini";
import { useRouter } from "expo-router";
import CourseCard from '@/components/CourseCard';

const API_URL = 'http://10.0.2.2:5000';

interface Quiz {
    _id: string;
    title: string;
    description: string;
    image?: string;
}

interface Course {
    _id: string;
    title: string;
    description: string;
    cover: string;
}

export default function HomePage() {
    const router = useRouter();
    const headerHeight = useHeaderHeight();

    const [featuredQuizzes, setFeaturedQuizzes] = useState<Quiz[]>([]);
    const [latestCourse, setLatestCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        Promise.all([
            fetchQuizzes(),
            fetchCourses()
        ]).finally(() => setLoading(false));
    }, []);

    const fetchQuizzes = async () => {
        try {
            const response = await fetch(`${API_URL}/globalQuizzes`);
            if (!response.ok) throw new Error('Failed to fetch quizzes');
            const data = await response.json();
            setFeaturedQuizzes(data.slice(0, 2)); // Limiter à 2 quiz pour l'affichage en vedette
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await fetch(`${API_URL}/courses`); // URL corrigée
            if (!response.ok) throw new Error('Failed to fetch courses');
            const data = await response.json();
            // Prendre le dernier cours de la liste
            if (data.length > 0) {
                setLatestCourse(data[data.length - 1]);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#0072FF" />
            </View>
        );
    }

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
                    {featuredQuizzes.length > 0 ? (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {featuredQuizzes.map((quiz) => (
                                <TouchableOpacity 
                                    key={quiz._id}
                                    className="mr-4 bg-gray-50 rounded-xl overflow-hidden"
                                    style={{ width: 200 }}
                                    onPress={() => router.push(`/(authenticated)/quizz/${quiz._id}`)}
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
                    ) : (
                        <Text className="text-gray-500">Aucun quiz disponible pour le moment</Text>
                    )}
                </View>

                {/* Section Cours */}
                <View className="mb-6">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-semibold">Dernier cours</Text>
                        <TouchableOpacity onPress={() => router.push("/courses")}>
                            <Text className="text-[#0072FF]">Voir tout</Text>
                        </TouchableOpacity>
                    </View>
                    {latestCourse ? (
                        <TouchableOpacity 
                            onPress={() => router.push(`/(authenticated)/course/${latestCourse._id}`)}
                        >
                            <CourseCard
                                title={latestCourse.title}
                                description={latestCourse.description}
                                cover={latestCourse.cover}
                            />
                        </TouchableOpacity>
                    ) : (
                        <Text className="text-gray-500">Aucun cours disponible pour le moment</Text>
                    )}
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