import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


const TeacherContext = createContext();

export const TeacherProvider = ({ children }) => {
  const [teacherData, setTeacherData] = useState([null]);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const api = 'http://34.125.232.84:3000';
        const token = localStorage.getItem('token');
        const response = await axios.get(`${api}/home`, { headers: { Authorization: `Bearer ${token}` } });
        setTeacherData(response.data.data);
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
      fetchTeacherData();
    
  }, [setTeacherData]);

  return (
    <TeacherContext.Provider value={{ teacherData }}>
        {children}
    </TeacherContext.Provider>
  );
};
TeacherProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTeacherContext = () => {
  return useContext(TeacherContext);
};