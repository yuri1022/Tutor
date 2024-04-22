import axios from "axios";
const baseUrl= 'http://54.250.240.16:3000';

export const getAdminUsers = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token is missing. Redirecting to login.");
    return;
  }
  try {
    const res = await axios.get(`${baseUrl}/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('API Response:', res);
    return res.data;
  } catch (error) {
    console.error('[Get Users by ID failed]: ', error);
  }
};



