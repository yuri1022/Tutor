import axios from "axios";
const baseUrl= 'https://ec2-13-231-143-123.ap-northeast-1.compute.amazonaws.com/api/course';


export const getCourse = async (id) => {
  const token = localStorage.getItem("token");
  // console.log('Fetching Course for ID:', id);
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

export const createCourse = async (formdata) => {
  const token = localStorage.getItem("token");
  const createData = {
    teacherId: formdata.teacherId,
    category:formdata.category,
    name: formdata.name,
    intro:formdata.intro,
    link:formdata.link,
    duration:formdata.duration,
    startAt:formdata.startAt,
  }
   console.log(createData);
  try {
    const res = await axios.post(`${baseUrl}`,createData,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
   
    return res.data;

  } catch (error) {
    console.error('[create Course failed]: ', error);
    if (error.response) {
      throw new Error(error.response.data.message); // 从 API 响应中获取错误消息并抛出
    } else {
      throw new Error('創建課程失敗'); // 如果没有响应，则抛出通用错误消息
    }
  }

};

export const deleteCourse = async(courseId) => {
 const token = localStorage.getItem("token");

  try {
    const res = await axios.delete(`${baseUrl}/${courseId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    
    return res.data;
    } catch (error) {
    console.error('[create Course failed]: ', error);
    if (error.response) {
      throw new Error(error.response.data.message); 
    } else {
      throw new Error('刪除課程錯誤'); 
    }
  }


};

export const putCourse = async(formdata,courseId) => {
 const token = localStorage.getItem("token");
  const putData = {
    teacherId: formdata.teacherId,
    category:formdata.category,
    name: formdata.name,
    intro:formdata.intro,
    link:formdata.link,
    duration:formdata.duration,
    startAt:formdata.startAt,
  }

  console.log(putData);
  try {
    const res = await axios.put(`${baseUrl}/${courseId}`,putData,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    
    return res.data;
    } catch (error) {
    console.error('[create Course failed]: ', error);
    if (error.response) {
      throw new Error(error.response.data.message); 
    } else {
      throw new Error('更新課程錯誤'); 
    }
  }


};