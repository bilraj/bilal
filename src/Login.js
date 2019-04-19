import React, { useState } from 'react';
import { login, logout } from './api';

export const Login = ({ loggedIn, dispatch }) => {
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  return loggedIn ? (
    <button onClick={() => logout(dispatch)}>Logout</button>
  ) : (
    <form
      onSubmit={event => {
        event.preventDefault();
        login({ UserName, Password }, dispatch);
      }}>
      <input
        type="text"
        name="email"
        value={UserName}
        onChange={event => setUserName(event.target.value)}
      />
      <input
        type="text"
        name="password"
        value={Password}
        onChange={event => setPassword(event.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};
