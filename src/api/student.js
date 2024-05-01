import axios from "axios";
const baseUrl= 'https://ec2-13-231-143-123.ap-northeast-1.compute.amazonaws.com/api/student'
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
        // console.log('API Response:', res);
        return res.data;
      } catch (error) {
    console.error('[Put failed]: ', error);
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('創建課程失敗'); 
    }
  }
}

export const get_student_data = async(id)=>{
  const token = localStorage.getItem("token");
    try{
      const res = await axios.get(`${baseUrl}/${id}`,{
        headers: { Authorization: `Bearer ${token}` }
    })
    // console.log('API Response:', res);
    const studentData =await  res.data;
    return studentData;
    } catch (error) {
      console.error('[Edit Student Data Error] ', error);
    }
}

