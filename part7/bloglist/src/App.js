import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";

import { Route, Routes } from "react-router-dom";

import Notification from "./components/Notification";
import PrivateRoute from "./components/PrivateRoute";
import LoginView from "./components/LoginView";
import BlogForm from "./components/BlogForm";
import NavBar from "./components/NavBar";
import BlogList from "./views/BlogList";
import SingleBlog from "./views/SingleBlog";
import Users from "./views/Users";
import SingleUser from "./views/SingleUser";

import { actions as blogActions } from "./reducers/blogs";
import { actions as usersActions } from "./reducers/users";

const App = () => {
  const message = useSelector(state => state.notification);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(blogActions.fetchInitial());
    dispatch(usersActions.fetchAll());
  }, [dispatch]);
  return (
    <div>
      <NavBar />

      <div className="container">
      {message.body ? <Notification message={message} /> : null}

      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
        <Route path="/users/:id" element={<PrivateRoute><SingleUser /></PrivateRoute>} />
        <Route
          path="add"
          element={<PrivateRoute><BlogForm /></PrivateRoute>}
        />
        <Route
          path="/"
          element={<PrivateRoute><BlogList /></PrivateRoute>}
        />
        <Route
          path="/blogs/:id"
          element={<PrivateRoute><SingleBlog /></PrivateRoute>}
        />
      </Routes>
      </div>
    </div>
  );
};

export default App;
