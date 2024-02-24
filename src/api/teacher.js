import axios from "axios";
const baseUrl= 'http://34.125.232.84:3000/teacher'

// 獲取單一教師的詳細信息
export const getTeacher = async (id) => {

  try {
    const res = await axios.get(`${baseUrl}/${id}`);
    console.log('API Response:', res);  // 新增這一行

    return res.data.data;
  } catch (error) {
    console.error('[Get Teacher by ID failed]: ', error);
  }
};


export const createTeacher = () => {};
export const patchTeacher = () => {};
export const deleteTeacher = () => {};