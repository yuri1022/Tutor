import axios from "axios";
const baseUrl= 'http://34.125.232.84:3000/teacher'


export const getTeacher = async (id) => {
  const token = localStorage.getItem("token");
  console.log('Fetching teacher data for ID:', id);
  if (!token) {
    console.error("Token is missing. Redirecting to login.");
    return;
  }

  try {
    const res = await axios.get(`${baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('API Response:', res);
    return res.data;
  } catch (error) {
    console.error('[Get Teacher by ID failed]: ', error);
  }
};



export const createTeacher = () => {};
export const patchTeacher = () => {};
export const deleteTeacher = () => {};