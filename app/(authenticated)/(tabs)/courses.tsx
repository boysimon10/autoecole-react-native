import React, { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator, Alert, TouchableOpacity, Text, TextInput } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useRouter } from "expo-router";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import CourseCard from '@/components/CourseCard';

interface Course {
    _id: string;
    title: string;
    description: string;
    cover: string;
}

const API_URL = 'http://10.0.2.2:5000/courses';

export default function Courses() {
    const router = useRouter();
    const headerHeight = useHeaderHeight();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Network error');
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
            Alert.alert('Error', 'Unable to fetch courses. Please try again later.');
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

    return (
        <View className="bg-white flex-1" style={{ paddingTop: headerHeight }}>
            <ScrollView showsVerticalScrollIndicator={false} className="p-4">
                <Text className="text-2xl font-bold mb-4">Tous les cours</Text>
                
                {/* Barre de recherche */}
                <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 mb-6">
                    <MagnifyingGlassIcon size={20} color="#666" />
                    <TextInput
                        placeholder="Rechercher un cours..."
                        className="ml-2 flex-1"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                {courses.map((course) => (
                    <TouchableOpacity 
                        key={course._id}
                        onPress={() => router.push(`/(authenticated)/course/${course._id}`)}
                        className="mb-4"
                    >
                        <CourseCard
                            title={course.title}
                            description={course.description}
                            cover={course.cover}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}