import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { actions as userActions } from "../reducers/user";

const LoginView = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const navigateTo = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigateTo("/");
    }
  });

  const afterLogin = useCallback(() => {
    navigateTo("/");
  }, [navigateTo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      username,
      password
    };
    dispatch(userActions.login({ credentials, callback: afterLogin }));
  };

  return (
    <React.Fragment>
      <h2>Log in to application</h2>
      {props.children}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div className="buttons">
          <input type="submit" value="Login" />
        </div>
      </form>
    </React.Fragment>
  );
};

export default LoginView;
