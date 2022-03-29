import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";

export const getUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user || null;
};

export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const login = createAsyncThunk(
  "user/login",
  ({ credentials, callback }) => {
    return userService.login(credentials).then((data) => {
      callback();
      return Promise.resolve(data)
    });
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: getUser(),
  reducers: {
    logout() {
      setUser("");
      return null;
    }
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      const { token, user: userData } = action.payload;
      const user = {
        ...userData,
        token
      };
      setUser(user);
      return user;
    });
  }
});

export const actions = {
  ...userSlice.actions,
  login
};


export default userSlice.reducer;
