import axios from "axios";
const baseUrl= 'http://54.250.240.16:3000/register'

export const createRegister = async(courseId)=>{
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing. Redirecting to login.");
      return;
    }
    try {
      const res = await axios.post(`${baseUrl}/${courseId}`,{},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('API Response:', res);
      return res.data;
    } catch (error) {
    console.error('[Register failed]: ', error);
    if (error.response) {
      throw new Error(error.response.data.message); 
    } else {
      throw new Error('無法預約!'); 
    }
  }
  }

export const delete_register_course = async(courseId)=>{
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing. Redirecting to login.");
      return;
    }
    try {
      const res = await axios.delete(`${baseUrl}/${courseId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('API Response:', res);
      return res.data;
    } catch (error) {
      console.error('[Edit Student Data Error] ', error);
    }
  }
  export const put_rating_course = async(rating,comment,courseId,studentId)=>{
    const token = localStorage.getItem("token");
    const formdata = {
        studentId:studentId,
        courseId: courseId,
        comment: comment,
        rating: rating,
    }
    if (!token) {
      console.error("Token is missing. Redirecting to login.");
      return;
    }
    try {
      const res = await axios.put(`${baseUrl}/${courseId}`,formdata,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('API Response:', res);
      return res.data;
    } catch (error) {
      console.error('[Edit Student Data Error] ', error);
    }
  }