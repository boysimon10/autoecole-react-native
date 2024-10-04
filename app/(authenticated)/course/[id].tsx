import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from "expo-router";
import { BookOpenIcon, ClockIcon, AcademicCapIcon, ChevronDownIcon, ChevronUpIcon } from "react-native-heroicons/outline";
import { ChevronLeftIcon } from 'react-native-heroicons/mini';

interface Chapter {
  title: string;
  content: string;
  image?: string;
}

interface Question {
  text: string;
  image: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  title: string;
  questions: Question[];
  pointsPerQuestion: number;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  cover: string;
  chapters: Chapter[];
  quiz?: Quiz;
  createdAt: string;
}

const API_URL = 'http://10.0.2.2:5000/courses'; // Assurez-vous que cette URL correspond à votre configuration

export default function CourseDetail() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { top } = useSafeAreaInsets();
    const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
    const [courseData, setCourseData] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCourseData();
    }, [id]);

    const fetchCourseData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données du cours');
            }
            const data = await response.json();
            setCourseData(data);
        } catch (err) {
            console.error('Error fetching course data:', err);
            setError('Impossible de charger les détails du cours. Veuillez réessayer plus tard.');
        } finally {
            setLoading(false);
        }
    };

    const toggleChapter = (index: number) => {
        setExpandedChapter(expandedChapter === index ? null : index);
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#0072FF" />
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 justify-center items-center p-4">
                <Text className="text-red-500 text-center">{error}</Text>
            </View>
        );
    }

    if (!courseData) {
        return (
            <View className="flex-1 justify-center items-center p-4">
                <Text className="text-center">Aucune donnée de cours disponible.</Text>
            </View>
        );
    }

    return (
        <View className="bg-white flex-1">
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
            <ScrollView showsVerticalScrollIndicator={false}>
                {courseData.cover && (
                    <Image 
                        source={{ uri: courseData.cover }}
                        className="w-full h-48"
                    />
                )}
                <View className="p-4">
                    <Text className="text-2xl font-bold mb-2">{courseData.title}</Text>
                    <Text className="text-gray-600 mb-4">{courseData.description}</Text>
                    
                    <View className="flex-row mb-6">
                        <View className="flex-row items-center mr-4">
                            <ClockIcon size={20} color="#666" />
                            <Text className="ml-1 text-gray-600">
                                {courseData.chapters.length * 5} min
                            </Text>
                        </View>
                        <View className="flex-row items-center">
                            <BookOpenIcon size={20} color="#666" />
                            <Text className="ml-1 text-gray-600">
                                {courseData.chapters.length} chapitres
                            </Text>
                        </View>
                    </View>

                    {/* Chapitres */}
                    <Text className="text-lg font-semibold mb-4">Contenu du cours</Text>
                    
                    {courseData.chapters.map((chapter, index) => (
                        <TouchableOpacity 
                            key={index}
                            onPress={() => toggleChapter(index)}
                            className="bg-gray-50 rounded-xl mb-4 overflow-hidden"
                        >
                            <View className="p-4 flex-row justify-between items-center">
                                <View className="flex-1">
                                    <Text className="font-semibold">{chapter.title}</Text>
                                </View>
                                {expandedChapter === index ? 
                                    <ChevronUpIcon size={20} color="#0072FF" /> :
                                    <ChevronDownIcon size={20} color="#0072FF" />
                                }
                            </View>
                            {expandedChapter === index && (
                                <View className="p-4 pt-0">
                                    {chapter.image && (
                                        <Image 
                                            source={{ uri: chapter.image }}
                                            className="w-full h-40 rounded-lg mb-4"
                                        />
                                    )}
                                    <Text className="text-gray-600">{chapter.content}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}

                    {/* Quiz */}
                    {courseData.quiz && (
                        <>
                            <Text className="text-lg font-semibold mb-4">Quiz du cours</Text>
                            <TouchableOpacity 
                                onPress={() => router.push(`/(authenticated)/courseQuizz/${id}`)}
                                className="bg-[#0072FF] p-4 rounded-xl flex-row items-center justify-between"
                            >
                                <View>
                                    <Text className="text-white font-semibold mb-1">
                                        {courseData.quiz.title}
                                    </Text>
                                    <Text className="text-white opacity-80">
                                        {courseData.quiz.questions.length} questions
                                    </Text>
                                </View>
                                <AcademicCapIcon size={24} color="white" />
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}