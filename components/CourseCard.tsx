import React from 'react';
import { View, Text, Image } from 'react-native';

interface CourseCardProps {
    title: string;
    description: string;
    cover: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, cover }) => {
  return (
    <View className="flex-row items-center bg-white rounded-lg border border-gray-200 mb-4">
      <Image
        source={{ uri: cover }}
        className="w-36 h-36 rounded-l-lg"
      />
      <View className="flex-1 m-2">
        <Text className="text-lg font-semibold mb-1">{title}</Text>
        <Text className="text-xs font-light mb-1" numberOfLines={3}>{description}</Text>
      </View>
    </View>
  );
};

export default CourseCard;
