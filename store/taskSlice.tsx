import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      console.warn("Adding Task:", action.payload);
      state.push(action.payload);
      console.warn(
        "Updated Task List After Add:",
        JSON.parse(JSON.stringify(state))
      );
    },
    editTask: (state, action) => {
      const taskId = Number(action.payload.id);
      const index = state.findIndex((task) => task.id === taskId);

      if (index !== -1) {
        console.warn("Editing Task:", action.payload);

        state[index].title = action.payload.title;
        state[index].description = action.payload.description; // Explicit update
        state[index].priority = action.payload.priority;
        state[index].completed =
          action.payload.completed ?? state[index].completed; // Preserve completion status

        console.warn("Updated Task List:", JSON.parse(JSON.stringify(state)));
      } else {
        console.warn("Task ID Not Found:", taskId);
      }
    },

    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    toggleComplete: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) task.completed = !task.completed;
    },
  },
});

export const { addTask, editTask, deleteTask, toggleComplete } =
  taskSlice.actions;
export default taskSlice.reducer;
