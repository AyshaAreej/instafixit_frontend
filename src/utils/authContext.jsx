import React, { createContext, useContext, useState, useEffect } from 'react';
import { encryptAndStore, getDecryptedData } from './cryptoUtils';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = getDecryptedData();
    return storedUser ? storedUser : null;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  useEffect(() => {
    if (user) {
      encryptAndStore(user);
    } else {
      localStorage.clear();
    }
  }, [user]);

  const signin = (newUser, callback) => {
  console.log("newUser", newUser);
  encryptAndStore(newUser);
  setUser(newUser);

  // Check roles from nested structure
  const roles = newUser.user?.userRoles || [];
  const isAdminUser = roles.some((r) => r.role?.name?.toLowerCase() === 'admin');

  if (isAdminUser) {
    setIsAdmin(true);
    localStorage.setItem('isAdmin', 'true');
  }

  callback();
};


  const signout = (callback) => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
    callback();
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
