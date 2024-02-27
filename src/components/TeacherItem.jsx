import { useNavigate, useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import '../main.scss'
import { Card } from 'react-bootstrap';
import RatingStar from '../assets/images/svg/rating.svg';
import Nation from '../assets/images/svg/canada.svg';
import '../assets/scss/homepage.scss';
import axios from 'axios';
// import { getTeacher } from '../api/teacher.js'


export const TeacherItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacherDetails, setTeacherDetails] = useState(null);
  const api = 'http://34.125.232.84:3000';

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${api}/teacher/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        setTeacherDetails(response.data.data)
        return response.data.data;
      } catch (error) {
        if (error.response) {
            // 请求已发出，但服务器返回错误响应
            console.error("Server error:", error.response.status, error.response.data);
        } else if (error.request) {
            // 请求已发出，但没有收到响应
            console.error("No response from server");
        } else {
            // 发送请求时出了点问题
            console.error("Request failed:", error.message);
        }

        // 可以在这里处理错误，例如显示适当的错误消息给用户
        throw error; // 继续抛出错误，以便在调用 apiLoginSubmit 的地方可以进一步处理
    }
    };

    fetchTeacherData();
  }, []);


  const handleButtonClick = () => {
    // 在這裡執行導航
    navigate(`/teacher/${id}`, { replace: true });
  };

  if (!teacherDetails) {
    // 如果教师详细信息还未获取到，可以显示加载状态或其他内容
    return <div>Loading...</div>;
  }


  return (
    
      <div className="div-container__info col col-4" key={id}>
        <Card className="card">
        <Card.Body >
        <div className="teacher-top">
        <div className="teacher-img" style={{width: '7.5rem',height:'7.5rem'}}>
        <img src={teacherDetails.avatar} alt={teacherDetails.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
        </div>
        <div className="teacher-basic-info">

          
        <div className="teacher-title" >
          <div className="teacher-nation">
            <img className="teacher-nation-img" src={Nation} alt={teacherDetails.nation} /></div>
        <h5 className="teacher-name" >{teacherDetails.name}</h5>
        

        <div className="teacher-rating" >
          <img className="teacher-rating-img" src={RatingStar} alt={teacherDetails.rating}/>
          <h6 className="teacher-rating-num">            
            {teacherDetails.rating}</h6>
          </div>

      <div className="teacher-reserve-button">
      
      <button className="btn-reserve btn btn-outline-secondary" onClick={handleButtonClick}>預約課程</button>
    </div>
        
        </div>
        </div>
        </div>

        <div className="teacher-category-container" >
         <div className="teacher-category" >
      {teacherDetails.Courses.map((course,index) => (
      <div className="teacher-item" key={`${course.id}-${index}`}>
          {course.Category.name}
                </div>
              ))}
</div>

        </div>

       
        <div className="teacher-info">
          <p className="teacher-info-text" >{teacherDetails.selfIntro}</p>
          </div>
        
     
   <div className="button-see-more" >
      
      <button className="btn-see-more btn btn-outline-light" onClick={handleButtonClick} >瀏覽更多</button>
    </div>
     </Card.Body>
   </Card>
   </div>
   

  );
};

TeacherItem.propTypes = {
  teacher: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    nation: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    selfIntro: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    Courses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        Category: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
};
