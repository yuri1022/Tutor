import { createContext, useState,useEffect } from 'react';
import React from 'react';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userCompleteData, setUserCompleteData] = useState(null);

  const login = (userData) => {
    // 实现登录逻辑，并将用户数据设置到状态中
    setUser(userData);
  };

  const setCompleteUserData = (userData) => {
    // 将完整的用户数据设置到状态中
    setUserCompleteData(userData);
  };

  useEffect(() => {
    console.log(user); // 在用户状态更新后打印 user
    console.log(userCompleteData); // 在用户完整数据状态更新后打印完整数据
  }, [user, userCompleteData]); // 每当 user 或 userCompleteData 发生变化时触发

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
    userCompleteData,
    setCompleteUserData,
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