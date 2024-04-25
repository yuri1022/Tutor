//teachercontext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// import { useParams,useLocation } from 'react-router-dom'; 
// import qs from 'qs';



const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [CourseData, setCourseData] = useState([]);


  useEffect(() => {
    const fetchAllCourseData = async () => {
      try {
        const api = 'https://ec2-54-250-240-16.ap-northeast-1.compute.amazonaws.com/api';
        const token = localStorage.getItem('token');  
        const response = await axios.get(`${api}/courses` ,{
        headers: { Authorization: `Bearer ${token}` },
      });
        setCourseData(response.data.data);
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
      fetchAllCourseData();
  }, [setCourseData]);
  

  return (
    <CourseContext.Provider value={{ CourseData }}>
        {children}
    </CourseContext.Provider>
  );
};
CourseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCourseContext = () => {
  return useContext(CourseContext);
};