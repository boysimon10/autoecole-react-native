import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
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
  title: string;
  description: string;
  chapters: Chapter[];
  quiz?: Quiz;
  createdAt: string;
}

export default function CourseDetail() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { top } = useSafeAreaInsets();
    const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

    // Ces données devraient venir de votre API
    const courseData: Course = {
        title: "La Signalisation Routière",
        description: "Apprenez tous les panneaux et leur signification pour une conduite sûre et responsable.",
        chapters: [
            {
                title: "Les panneaux de danger",
                content: "Les panneaux de danger sont de forme triangulaire avec un fond blanc et une bordure rouge. Ils avertissent les usagers de la route d'un danger potentiel et les incitent à redoubler de vigilance.",
                image: "https://evs-strapi-images-prod.imgix.net/Illus_fc_Ensemble_panneaux_danger_30c5e11be4.png?w=3840&q=75"
            },
            {
                title: "Les panneaux d'interdiction",
                content: "Les panneaux d'interdiction sont circulaires avec un fond blanc et une bordure rouge. Ils indiquent une interdiction spécifique aux usagers de la route.",
                image: "https://example.com/interdiction.jpg"
            }
        ],
        quiz: {
            title: "Test sur la signalisation",
            questions: [
                {
                    text: "Que signifie ce panneau triangulaire rouge et blanc ?",
                    image: "https://example.com/panneau1.jpg",
                    options: ["Danger", "Stop", "Céder le passage", "Interdiction"],
                    correctAnswer: 0
                }
            ],
            pointsPerQuestion: 1
        },
        createdAt: new Date().toISOString()
    };

    const toggleChapter = (index: number) => {
        setExpandedChapter(expandedChapter === index ? null : index);
    };

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
                {courseData.chapters[0]?.image && (
                    <Image 
                        source={{ uri: courseData.chapters[0].image }}
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
                                onPress={() => router.push(`/(authenticated)/quizz/${id}`)}
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