//teachercontext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useParams,useLocation } from 'react-router-dom'; 
import qs from 'qs';



const TeacherContext = createContext();

export const TeacherProvider = ({ children,searchTerm}) => {
  const [teacherData, setTeacherData] = useState([]);
  const { page, categoryId } = useParams(); // 获取路由参数
  const location = useLocation();
  const parsed = qs.parse(location.search, { ignoreQueryPrefix: true });
  const currentPage = parsed.page || 1;
  const categoryPage = parsed.categoryId || '';
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    setSearchKeyword(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const api = 'https://ec2-13-231-143-123.ap-northeast-1.compute.amazonaws.com/api';
        const token = localStorage.getItem('token');
        const queryString = qs.stringify({ 
          page: currentPage, 
          categoryId: categoryPage,
          keyword: searchKeyword,
      }, { skipNulls: true });      

        const url = queryString ? `${api}/home?${queryString}` : `${api}/home`;
        const response = await axios.get(url ,{
        headers: { Authorization: `Bearer ${token}` },
      });
        setTeacherData(response.data.data);
        console.log(queryString);
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
  }, [page, categoryId,currentPage, categoryPage,searchKeyword, setTeacherData]);
  

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