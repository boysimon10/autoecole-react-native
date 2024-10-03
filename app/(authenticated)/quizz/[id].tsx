import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from "expo-router";
import { CheckCircleIcon, XCircleIcon, ArrowRightIcon } from "react-native-heroicons/outline";

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

export default function QuizPage() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { top } = useSafeAreaInsets();
    
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    // Ces données devraient venir de votre API en fonction de l'ID du cours
    const quizData: Quiz = {
        title: "Test sur la signalisation routière",
        questions: [
            {
                text: "Que signifie ce panneau triangulaire rouge et blanc ?",
                image: "https://evs-strapi-images-prod.imgix.net/Illus_fc_Ensemble_panneaux_danger_30c5e11be4.png?w=3840&q=75",
                options: ["Danger général", "Stop", "Céder le passage", "Interdiction"],
                correctAnswer: 0
            },
            {
                text: "Quel est le sens de ce panneau rond à fond bleu ?",
                image: "https://example.com/panneau2.jpg",
                options: ["Direction obligatoire", "Aire de repos", "Limitation de vitesse", "Zone de stationnement"],
                correctAnswer: 0
            }
        ],
        pointsPerQuestion: 1
    };

    const handleAnswer = (selectedIndex: number) => {
        setSelectedAnswer(selectedIndex);
        
        setTimeout(() => {
            if (selectedIndex === quizData.questions[currentQuestion].correctAnswer) {
                setScore(score + quizData.pointsPerQuestion);
            }
            
            if (currentQuestion < quizData.questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(null);
            } else {
                setQuizCompleted(true);
            }
        }, 1000);
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setScore(0);
        setQuizCompleted(false);
    };

    if (quizCompleted) {
        return (
            <View className="flex-1 bg-white justify-center items-center p-4" style={{ paddingTop: top }}>
                <Text className="text-3xl font-bold mb-4">Quiz terminé !</Text>
                <Text className="text-xl mb-2">Votre score :</Text>
                <Text className="text-4xl font-bold text-[#0072FF] mb-8">
                    {score} / {quizData.questions.length * quizData.pointsPerQuestion}
                </Text>
                <TouchableOpacity 
                    onPress={restartQuiz}
                    className="bg-[#0072FF] py-3 px-6 rounded-full mb-4"
                >
                    <Text className="text-white font-semibold">Recommencer le quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => router.back()}
                    className="py-3 px-6 rounded-full"
                >
                    <Text className="text-[#0072FF]">Retour</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className="bg-white flex-1" style={{ paddingTop: top }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="p-4">
                    <Text className="text-xl font-bold mb-4">{quizData.title}</Text>
                    
                    {/* Barre de progression */}
                    <View className="mb-4">
                        <View className="flex-row justify-between mb-2">
                            <Text>Question {currentQuestion + 1}/{quizData.questions.length}</Text>
                            <Text>Score: {score}</Text>
                        </View>
                        <View className="h-2 bg-gray-200 rounded-full">
                            <View 
                                className="h-2 bg-[#0072FF] rounded-full"
                                style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
                            />
                        </View>
                    </View>

                    {/* Question actuelle */}
                    <View className="mb-6">
                        <Image 
                            source={{ uri: quizData.questions[currentQuestion].image }}
                            className="w-full h-48 rounded-xl mb-4"
                        />
                        <Text className="text-lg font-semibold mb-4">
                            {quizData.questions[currentQuestion].text}
                        </Text>
                    </View>

                    {/* Options de réponse */}
                    {quizData.questions[currentQuestion].options.map((option, index) => (
                        <TouchableOpacity 
                            key={index}
                            onPress={() => handleAnswer(index)}
                            disabled={selectedAnswer !== null}
                            className={`mb-4 p-4 rounded-xl flex-row justify-between items-center ${
                                selectedAnswer === null
                                    ? 'bg-gray-50'
                                    : selectedAnswer === index
                                        ? index === quizData.questions[currentQuestion].correctAnswer
                                            ? 'bg-green-500'
                                            : 'bg-red-500'
                                        : 'bg-gray-50'
                            }`}
                        >
                            <Text className={selectedAnswer === index ? 'text-white' : 'text-gray-700'}>
                                {option}
                            </Text>
                            {selectedAnswer === index && (
                                index === quizData.questions[currentQuestion].correctAnswer
                                    ? <CheckCircleIcon size={24} color="white" />
                                    : <XCircleIcon size={24} color="white" />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}