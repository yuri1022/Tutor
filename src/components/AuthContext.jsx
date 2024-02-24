import { createContext, useState } from 'react';
import React from 'react';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // 实现登录逻辑，并将用户数据设置到状态中
    setUser(userData);
  };

  const logout = () => {
    // 实现登出逻辑，并将用户数据设置为 null
    setUser(null);
  };

  const isUserLoggedIn = () => {
    // 检查用户是否已登录，根据实际情况实现
    return user !== null;
  };

  const contextValue = {
    user,
    login,
    logout,
    isUserLoggedIn,
    // ... 其他方法
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