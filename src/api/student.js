import axios from "axios";
const baseUrl= 'https://ec2-54-250-240-16.ap-northeast-1.compute.amazonaws.com/api/student'
export const edit_student_data = async(id,formdata)=>{
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("Token is missing. Redirecting to login.");
        return;
      }
      try {
        const res = await axios.put(`${baseUrl}/${id}`,formdata,{
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('API Response:', res);
        return res.data;
      } catch (error) {
    console.error('[Put failed]: ', error);
    if (error.response) {
      throw new Error(error.response.data.message); // 从 API 响应中获取错误消息并抛出
    } else {
      throw new Error('創建課程失敗'); // 如果没有响应，则抛出通用错误消息
    }
  }
}

export const get_student_data = async(id)=>{
  const token = localStorage.getItem("token");
    try{
      const res = await axios.get(`${baseUrl}/${id}`,{
        headers: { Authorization: `Bearer ${token}` }
    })
    console.log('API Response:', res);
    const studentData =await  res.data;
    return studentData;
    } catch (error) {
      console.error('[Edit Student Data Error] ', error);
    }
}

