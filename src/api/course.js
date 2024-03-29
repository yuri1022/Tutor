import axios from "axios";
const baseUrl= 'http://34.125.232.84:3000/course';


export const getCourse = async (id) => {
  const token = localStorage.getItem("token");
  console.log('Fetching Course for ID:', id);
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
    teacherId: localStorage.getItem("userdata.data.id"),
    category:formdata.category,
    name: formdata.name,
    intro:formdata.intro,
    link:formdata.link,
    duration:formdata.duration,
    startAt:formdata.startAt,
  }
  try {
    const res = await axios.post(`${baseUrl}`,createData,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data;

  } catch (error) {
    console.error('[create Course failed]: ', error);
  }

};




export const putCourse = async(formdata) => {
 const token = localStorage.getItem("token");
  const putData = {
    teacherId: localStorage.getItem("userdata.data.id"),
    category:formdata.category,
    name: formdata.name,
    intro:formdata.intro,
    link:formdata.link,
    duration:formdata.duration,
    startAt:formdata.startAt,
  }
  try {
    const res = await axios.put(`${baseUrl}`,putData,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data;

  } catch (error) {
    console.error('[put Course failed]: ', error);
  }


};

