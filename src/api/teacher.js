import axios from "axios";
const baseUrl= 'http://54.250.240.16:3000/teacher'


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

export const patchTeacher = () => {};

export const applyTeacher = async(id,formdata)=>{
  const token = localStorage.getItem("token");
  const patchdata = {
    name: formdata.name,
    email:formdata.email,
    password: formdata.password,
  }
  try {
    const res = await axios.put(`${baseUrl}/${id}`,formdata,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then( async() =>{
      const postres = await axios.patch(`${baseUrl}/${id}`,patchdata,{
        headers:{
          Authorization: `Bearer ${token}`,
        },
      }).then((res)=>{
        console.log(res.data);
        console.log('申請成為老師成功');
      })
  })
    console.log('API Response:', res);
    return res.data;

  } catch (error) {
    console.error('[Apply Teacher failed]: ', error);
  }

}