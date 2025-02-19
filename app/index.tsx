import React from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, toggleComplete } from "../store/taskSlice";
import { useRouter } from "expo-router";
import CheckBox from "react-native-check-box";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function Home() {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const router = useRouter();
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
  });

  return (
    <View className="flex-1 bg-white p-5">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <Image
            source={require("@/assets/images/profile.jpg")}
            className="w-16 h-16 rounded-full border-2 border-blue-500"
          />
          <View
            className="
          flex justify-center"
          >
            <Text className="text-xl font-semibold ml-3">Hi, Rashid 👋</Text>
            <Text className="text-gray-600 mb-4 ml-3">
              Your daily adventure starts now
            </Text>
          </View>
        </View>
        <TouchableOpacity className="mr-1">
          <Ionicons name="grid" size={24} color="#7393B3" />
        </TouchableOpacity>
      </View>

      <View className="bg-blue-500 h-[110px] p-5 rounded-3xl flex-row items-center justify-between mb-2">
        <View className="flex-1">
          <Text className="text-white text-xl font-bold mb-2">
            Manage your time well
          </Text>
          <Text className="text-white text-lg font-semibold">
            Today: {today}
          </Text>
        </View>

        <Image
          source={require("@/assets/images/todo.png")}
          className="w-20 h-20"
          resizeMode="contain"
        />
      </View>

      {tasks.length === 0 ? (
        <Text className="text-center text-gray-500 text-lg mt-10">
          No tasks added yet. Tap + to add one.
        </Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            
            <View
              className={`bg-white p-4 my-2 rounded-lg flex-row items-center justify-between border-2 shadow-lg ${
                item.completed ? "border-gray-400" : "border-blue-500"
              }`}
            >
              {/* Checkbox for completion */}
              <CheckBox
                isChecked={item.completed}
                onClick={() => dispatch(toggleComplete(item.id))}
                checkBoxColor={item.completed ? "green" : "gray"}
              />

              <View className="flex-1 ml-6">
                <Text
                  className={`text-lg font-semibold ${
                    item.completed ? "line-through text-gray-400" : "text-black"
                  }`}
                >
                  {item.title}
                </Text>
                <Text className="text-gray-500 text-base my-1">
                  {item.description}
                </Text>
                <Text
                  className={`text-sm font-medium ${
                    item.priority === "High"
                      ? "text-red-600"
                      : item.priority === "Medium"
                      ? "text-orange-600"
                      : "text-green-600"
                  }`}
                >
                  {item.priority}
                </Text>
              </View>

              {/* Edit & Delete Buttons */}
              <View className="flex-row">
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/TaskFormScreen",
                      params: {
                        id: item.id.toString(),
                        title: item.title,
                        description: item.description,
                        priority: item.priority,
                      },
                    })
                  }
                  className="p-2 mr-2"
                >
                  <Text className="text-blue-500 text-xl">✏️</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => dispatch(deleteTask(item.id))}
                  className="p-2"
                >
                  <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={() => router.push("/TaskFormScreen")}
        className="absolute bottom-5 right-5 bg-blue-500 w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
      >
        <Text className="text-white text-4xl">+</Text>
      </TouchableOpacity>
    </View>
  );
}
