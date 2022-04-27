import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import activityURL from "../activityAPI";



const getActivity = async () => {
  const response = await fetch(activityURL, { mode: 'no-cors' });
  const result = await response;
  return result;
};

export const getActivityAll = createAsyncThunk(
  "allActivities",
  getActivity
);

// Get Tasks from Local Storage
const setInitialState = () => {
  const json = localStorage.getItem('todos');
  if (json !== null) {
    return {
      entries: JSON.parse(json)
    }
  } else {
    return {
      entries: [
        { name: "Visit Pakistan.", isDone: false },
        { name: "Buy Tesla", isDone: false },
        { name: "Find Job", isDone: false },
        { name: "Plant a Tree", isDone: false }
      ]
    };
  }
}


export const todoSlice = createSlice({
  name: "todos",
  initialState: setInitialState,
  reducers: {
    addTodoEntry: (state, action) => {
      state.entries.push({ name: action.payload, isDone: false });
      localStorage.setItem('todos', JSON.stringify(state.entries));
    },
    removeEntry: (state, action) => {
      state.entries.splice(action.payload, 1);
      localStorage.setItem('todos', JSON.stringify(state.entries));
    },
    toggleEntryDone: (state, action) => {
      state.entries[action.payload].isDone = !state.entries[action.payload].isDone;
      localStorage.setItem('todos', JSON.stringify(state.entries));
    }
  },
  // extraReducers: {
  //   [getActivityAll.fulfilled]: (state, action) => {
  //     state.imageUrls = action.payload;
  //     state.currentImageUrlIndex = 0;
  //   }
  // }
});

export const { addTodoEntry, removeEntry, toggleEntryDone } = todoSlice.actions;
export default todoSlice.reducer;
