//teacherselfcontext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'; 
// import qs from 'qs';

const TeacherSelfContext = createContext();

export const TeacherSelfProvider = ({ children,teacherId }) => {
  const [teacherData, setTeacherSelfData] = useState([null]);

  useEffect(() => {
    const fetchTeacherSelfData = async () => {
      try {
        const api = 'http://34.125.232.84:3000';
        const token = localStorage.getItem('token');
        const response = await axios.get(`${api}/teacher/${teacherId}` ,{
        headers: { Authorization: `Bearer ${token}` },
      });
        setTeacherSelfData(response.data.data);
        return response.data.data;
        
      } catch (error) {
        if (error.response) {
          console.error("Server error:", error.response.status, error.response.data);
        } else if (error.request) {
          console.error("No response from server");
        } else {
          console.error("Request failed:", error.message);
        }
        throw error;
      }
    };
      fetchTeacherSelfData();
  }, [teacherId,setTeacherSelfData]);
  

  return (
    <TeacherSelfContext.Provider value={{ teacherData }}>
        {children}
    </TeacherSelfContext.Provider>
  );
};
TeacherSelfProvider.propTypes = {
  children: PropTypes.node.isRequired,
  teacherId: PropTypes.number.isRequired,
};

export const useTeacherSelfContext = () => {
  return useContext(TeacherSelfContext);
};