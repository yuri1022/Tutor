import { createContext, useState,useEffect } from 'react';
import React from 'react';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userCompleteData, setUserCompleteData] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const setCompleteUserData = (userData) => {
    setUserCompleteData(userData);
  };

  useEffect(() => {
    console.log(user); 
    console.log(userCompleteData); 
  }, [user, userCompleteData]); 

  const logout = () => {
    setUser(null);
  };



  const isUserLoggedIn = () => {
    return user !== null;
  };

  const contextValue = {
    user,
    userCompleteData,
    setCompleteUserData,
    login,
    logout,
    isUserLoggedIn,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };