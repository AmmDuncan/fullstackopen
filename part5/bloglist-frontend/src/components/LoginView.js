import React, { useState } from 'react';
import loginService from '../services/login';
import sessionData from '../utils/session-data';

const LoginView = (props) => {
  const { setUser, notify } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      username,
      password
    };
    loginService
      .login(credentials)
      .then(({ user, token }) => {
        const userData = { ...user, token };
        setUser(userData);
        sessionData.setUser(userData);
      })
      .catch((error) => {
        const message = {
          body: error.response.data.error,
          error: true
        };
        notify(message);
      });
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
        <input type="submit" value="Login"/>
      </form>
    </React.Fragment>
  );
};

export default LoginView;
