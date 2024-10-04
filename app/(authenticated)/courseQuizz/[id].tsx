import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from "expo-router";
import { CheckCircleIcon, XCircleIcon, ArrowLeftIcon } from "react-native-heroicons/outline";
import { Audio } from 'expo-av'; // Importer expo-av pour jouer des sons

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

const API_URL = 'http://10.0.2.2:5000/courses';

// Sons pour les réponses correctes et incorrectes
const correctSound = require('@/assets/sounds/success.mp3');
const incorrectSound = require('@/assets/sounds/incorrect.mp3');

export default function CourseQuizz() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { top } = useSafeAreaInsets();
    
    const [quizData, setQuizData] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    useEffect(() => {
        fetchQuizData();
    }, [id]);

    const fetchQuizData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données du quiz');
            }
            const data = await response.json();
            if (!data.quiz) {
                throw new Error('Aucun quiz trouvé pour ce cours');
            }
            setQuizData(data.quiz);
        } catch (err) {
            console.error('Error fetching quiz data:', err);
            setError('Impossible de charger le quiz. Veuillez réessayer plus tard.');
        } finally {
            setLoading(false);
        }
    };

    const playSound = async (soundUri: any) => {
        const { sound } = await Audio.Sound.createAsync(soundUri);
        await sound.playAsync();
    };

    const handleAnswer = async (selectedIndex: number) => {
        if (!quizData) return;

        setSelectedAnswer(selectedIndex);
        
        // Jouer le son approprié
        if (selectedIndex === quizData.questions[currentQuestion].correctAnswer) {
            await playSound(correctSound);
        } else {
            await playSound(incorrectSound);
        }

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

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#0072FF" />
            </View>
        );
    }

    if (error || !quizData) {
        return (
            <View className="flex-1 justify-center items-center p-4">
                <Text className="text-red-500 text-center">{error || 'Aucun quiz disponible pour ce cours.'}</Text>
            </View>
        );
    }

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
                    <Text className="text-[#0072FF]">Retour au cours</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className="bg-white flex-1" style={{ paddingTop: top }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="p-4">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="mb-4"
                    >
                        <ArrowLeftIcon size={24} color="#0072FF" />
                    </TouchableOpacity>
                    
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
                                            ? 'bg-green-500' // Couleur pour la réponse correcte
                                            : 'bg-red-500'   // Couleur pour la réponse incorrecte
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
