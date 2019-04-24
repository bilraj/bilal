import React, { useState } from 'react';
import { login, logout } from './api';
import { Button } from 'react-bootstrap';
import { AbstractNav } from 'react-bootstrap';

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
      <Button type="submit">Login</Button>
    </form>
  );
};
