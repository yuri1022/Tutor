import axios from "axios";
const baseUrl= 'https://ec2-54-250-240-16.ap-northeast-1.compute.amazonaws.com/api';

export const createAccount = async (data) => {
  try {
      const formData={
            email:data.email,
            password:data.password,
            passwordCheck:data.repassword,
            name:data.email.split('@')[0],
        }
    console.log('fd',formData)
    const res = await axios.post(`${baseUrl}/signup`, formData);
    console.log('API Response:', res);
    return res.data;
  } catch (error) {
    console.error('[register failed]: ', error);
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('註冊失敗!'); 
    }
  }
};

export const handleLogin = async (email,password) => {
  const loginData = {
    "email": email,
    "password":password,
  }
  try {
    const res = await axios.post(`${baseUrl}/signin`,loginData)
    return res.data;

  } catch (error) {
    console.error('[login failed]: ', error);
    if (error.response) {
      throw new Error(error.response.data.message); 
    } else {
      throw new Error('登入失敗!'); 
    }
  }

};


