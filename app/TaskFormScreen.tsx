import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../store/taskSlice";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TaskFormScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    id,
    title: initialTitle,
    description: initialDesc,
    priority: initialPriority,
  } = useLocalSearchParams();
  const isEditing = !!id;

  const [title, setTitle] = useState(initialTitle || "");
  const [description, setDescription] = useState(initialDesc || "");
  const [priority, setPriority] = useState(initialPriority || "Low");

  const handleSave = () => {
    console.warn("Updating Task:", { id, title, description, priority });
    if (isEditing) {
      dispatch(
        editTask({ id, title, description, priority, completed: false })
      );
    } else {
      dispatch(
        addTask({
          id: Date.now(),
          title,
          description,
          priority,
          completed: false,
        })
      );
    }
    router.back();
  };
  const navigation = useNavigation();
  return (
    <View className="flex-1 p-2 pt-0">
      <View className="bg-blue-500 h-[200px] rounded-b-full items-center justify-center relative mb-10">
        {/* Menu Icon */}
        <TouchableOpacity
          className="absolute left-5 top-10"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>

        {/* Title */}
        <Text className="text-3xl font-bold text-white mt-10">
          {isEditing ? "Update Task" : "New Task"}
        </Text>

        {/* Back Icon */}
        <TouchableOpacity className="absolute right-5 top-10">
          <Ionicons name="menu" size={28} color="white" />
        </TouchableOpacity>
      </View>
      <View className="mx-2">
        <Text className="text-lg font-bold mb-2">Title</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          className="border border-slate-400 rounded-md p-3 mb-4"
          placeholder="Enter task title"
        />

        <Text className="text-lg font-bold mb-2">Description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          className="border border-slate-400 rounded-md p-3 mb-4 h-[120px]"
          placeholder="Enter task description"
          multiline
          style={{ textAlignVertical: "top" }}
        />

        <Text className="text-lg font-bold mb-3">Priority</Text>
        <View className="flex-row justify-between mb-5">
          {["Low", "Medium", "High"].map((level) => (
            <TouchableOpacity
              key={level}
              onPress={() => setPriority(level)}
              className="flex-row items-center"
            >
              <View
                className={`w-5 h-5 rounded-full border-2 border-blue-500 mr-2 ${
                  priority === level ? "bg-blue-500" : "bg-transparent"
                }`}
              />
              <Text className="text-base">{level}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={handleSave}
          className="bg-blue-500 p-4 rounded-md items-center"
        >
          <Text className="text-white text-lg font-bold">
            {isEditing ? "Update Task" : "Save Task"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
