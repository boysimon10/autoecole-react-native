import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useRouter } from "expo-router";
import { PlayIcon } from "react-native-heroicons/outline";

const API_URL = 'http://10.0.2.2:5000/globalQuizzes/';

interface Quiz {
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

export default function QuizList() {
    const router = useRouter();
    const headerHeight = useHeaderHeight();
    const [quizzes, setQuizzes] = React.useState<Quiz[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch quizzes');
            }
            const data = await response.json();
            setQuizzes(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
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
            <View className="flex-1 justify-center items-center">
                <Text className="text-red-500">{error}</Text>
            </View>
        );
    }

    return (
        <View className="bg-white flex-1" style={{ paddingTop: headerHeight }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="p-4">
                    <Text className="text-2xl font-bold mb-4">Quiz disponibles</Text>
                    
                    {quizzes.map((quiz) => (
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