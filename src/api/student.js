import axios from "axios";
const baseUrl= 'http://34.125.232.84:3000/student'
export const edit_student_data = async(id)=>{
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("Token is missing. Redirecting to login.");
        return;
      }
      try {
        const res = await axios.put(`${baseUrl}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('API Response:', res);
        return res.data;
      } catch (error) {
        console.error('[Get Teacher by ID failed]: ', error);
      }
}
