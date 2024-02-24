import axios from "axios";
const baseUrl= 'http://34.125.232.84:3000'

// 獲取單一教師的詳細信息
export const getTeacher = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // 如果沒有 token，可能需要處理一些錯誤或重新導向登錄頁面
    console.error("Token is missing. Redirecting to login.");
    return;
  }

  try {
    const res = await axios.get(`${baseUrl}/teacher/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('API Response:', res);
    return res.data.data;
  } catch (error) {
    console.error('[Get Teacher by ID failed]: ', error);
  }
};
export const createTeacher = async (id) => {

  try {
    const res = await axios.post(`${baseUrl}/${id}`);
    console.log('API Response:', res);  // 新增這一行

    return res.data.data;
  } catch (error) {
    console.error('[Create Teacher by ID failed]: ', error);
  }
};
export const patchTeacher = () => {};
export const deleteTeacher = () => {};