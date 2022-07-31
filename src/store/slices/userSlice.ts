import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  id: "",
  count: 0,
  state: "All",
  tasks: [];
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    setCount(state, action) {
      state.count = action.payload.count
    },
    setState(state, action) {
      state.tasks = [...action.payload]
    },
    setTasks(state, action) {
      state.tasks = action.payload.tasks;
    },
    removeUser(state) {
      state.email = null;
      state.id = "";
      state.count = 0;
      state.state = "All";
      state.tasks = [];
    }
  }
})

export const { setUser, setCount, removeUser, setState, setTasks } = userSlice.actions;
export default userSlice.reducer;