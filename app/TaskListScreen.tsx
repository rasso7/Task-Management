import React from "react";
import { View, FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import TaskItem from "./index";
import { Link } from "expo-router"; // Import Link from expo-router

export default function TaskListScreen() {
  const tasks = useSelector((state) => state.tasks);

  return (
    <View className="flex-1 p-5">
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TaskItem task={item} />}
      />

      <Link
        href="/TaskFormScreen"
        className="absolute bottom-5 right-5 bg-purple-700 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
      >
        <Text className="text-white text-2xl">+</Text>
      </Link>
    </View>
  );
}
