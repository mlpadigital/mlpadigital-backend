//src/context/AuthProvider.jsx
import React from 'react';
import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null); // { user, token }

  const login = (userData) => {
    setAuth(userData);
    localStorage.setItem('auth', JSON.stringify(userData));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);