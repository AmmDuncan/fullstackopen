import { configureStore } from "@reduxjs/toolkit";

import blogReducer from "./reducers/blogs";
import notificationReducer from "./reducers/notification";
import userReducer from "./reducers/user";
import usersReducer from './reducers/users';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer,
    users: usersReducer,
  }
});

export default store;
