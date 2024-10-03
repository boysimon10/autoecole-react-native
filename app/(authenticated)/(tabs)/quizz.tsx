import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useRouter, useLocalSearchParams } from "expo-router";
import { PlayIcon, ClockIcon, AcademicCapIcon } from "react-native-heroicons/outline";

interface quizz {
    _id: string;
    title: string;
    description: string;
    questions: Array<{
        text: string;
        image?: string;
        options: string[];
        correctAnswer: number;
    }>;
    pointsPerQuestion: number;
}

export default function CourseDetail() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const headerHeight = useHeaderHeight();

    // Ces données devraient venir de votre API
    const courseData = {
        _id: id,
        title: "La Signalisation Routière",
        description: "Apprenez tous les panneaux et leur signification pour une conduite sûre et responsable.",
        cover: "https://evs-strapi-images-prod.imgix.net/Illus_fc_Ensemble_panneaux_danger_30c5e11be4.png?w=3840&q=75",
        quizzes: [
            {
                _id: "quiz1",
                title: "Les panneaux de danger",
                description: "Testez vos connaissances sur les panneaux triangulaires",
                questions: [
                    {
                        text: "Que signifie ce panneau ?",
                        image: "https://example.com/panneau1.jpg",
                        options: ["Virage à droite", "Virage à gauche", "Route sinueuse", "Chaussée rétrécie"],
                        correctAnswer: 0
                    }
                ],
                pointsPerQuestion: 1
            },
            {
                _id: "quiz2",
                title: "Les panneaux d'obligation",
                description: "Maîtrisez les panneaux ronds à fond bleu",
                questions: [
                    {
                        text: "Quel est le sens de ce panneau ?",
                        image: "https://example.com/panneau2.jpg",
                        options: ["Obligation de tourner", "Direction obligatoire", "Contournement obligatoire", "Piste cyclable"],
                        correctAnswer: 1
                    }
                ],
                pointsPerQuestion: 1
            }
        ]
    };

    return (
        <View className="bg-white flex-1" style={{ paddingTop: headerHeight }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image 
                    source={{ uri: courseData.cover }}
                    className="w-full h-48"
                />
                <View className="p-4">
                    <Text className="text-2xl font-bold mb-2">{courseData.title}</Text>
                    <Text className="text-gray-600 mb-4">{courseData.description}</Text>
                    
                    <View className="flex-row mb-6">
                        <View className="flex-row items-center mr-4">
                            <ClockIcon size={20} color="#666" />
                            <Text className="ml-1 text-gray-600">20 min</Text>
                        </View>
                        <View className="flex-row items-center">
                            <AcademicCapIcon size={20} color="#666" />
                            <Text className="ml-1 text-gray-600">{courseData.quizzes.length} quiz</Text>
                        </View>
                    </View>

                    <Text className="text-lg font-semibold mb-4">Quiz disponibles</Text>
                    
                    {courseData.quizzes.map((quiz) => (
                        <TouchableOpacity 
                            key={quiz._id}
                            onPress={() => router.push(`/(authenticated)/quizz/${quiz._id}`)}
                            className="bg-gray-50 rounded-xl p-4 mb-4 flex-row items-center"
                        >
                            <View className="flex-1">
                                <Text className="font-semibold mb-1">{quiz.title}</Text>
                                <Text className="text-gray-600 text-sm">{quiz.description}</Text>
                                <Text className="text-sm text-[#0072FF] mt-2">
                                    {quiz.questions.length} questions
                                </Text>
                            </View>
                            <PlayIcon size={24} color="#0072FF" />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}