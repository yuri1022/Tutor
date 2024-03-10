//teacherpage

import { useParams } from "react-router-dom";
import NationImg from '../assets/images/svg/canada.svg';
import '../assets/scss/teacherpage.scss'
import MyCalendar from "../components/Teacher_profile_Calendar";
import PropTypes from 'prop-types';
import ClassComments from "../components/ClassComments";
import ClassReserve from '../components/ClassReserve.jsx';
import { useState ,useEffect } from "react";
import '../assets/scss/teacher.scss';
import axios from "axios";
import { Button } from 'react-bootstrap';



const TeachersPage = () => {
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [isSelfIntroExpanded, setIsSelfIntroExpanded] = useState(true);
  const [isTeachStyleExpanded, setIsTeachStyleExpanded] = useState(true);
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(true);
  const [isNoticeExpanded, setIsNoticeExpanded] = useState(true);
  const [reserveModalOpen,setIsReserveModalOpen]= useState(false);


  const { id } = useParams();
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
  }, [id]);
  
    if (!teacherDetails) {
    return null; // 或者你可以渲染加载中的 UI
  }


  const handleReserveOpen = () => {
    setIsReserveModalOpen(true);
  };

  const handleReserveClose = () => {
    setIsReserveModalOpen(false);
  };


  return ( 
      <div>
    
      <div className="div-container col-12 d-flex" >
        <div className="form-left col-12 col-md-9 col-lg-9" >

              

              <div className="card-container" >

              <div className="self-card-container">
      
              <img className="self-card-img" src={teacherDetails.avatar} alt={teacherDetails.name} />

              <div className="self-info-container" >

              <div className="self-name-nation-container" >
              <div className="self-nation" >
               <img src={NationImg} alt={teacherDetails.nation} />
                <h6 className="self-name">{teacherDetails.name}</h6>
              </div>
              </div>
                <div className="self-category-container">        
                  <div className="self-category">
    {[...new Set(teacherDetails.teaching_categories.map(categories => categories.Category.name).flat())]
      .map((category, index) => (
        <span className="self-teacher-item" key={index}>{category}</span>
      ))}
                    </div>
                </div>
               

             </div>

              </div> 

       <div className="reserve-button">
        <Button className="btn-reserve" style={{background:'linear-gradient(#1AEAEA,#3652E3)',border:'none'}} onClick={() => handleReserveOpen()}>
          <div style={{fontSize:'0.875rem'}}>
            預約上課
          </div>
          
          </Button>
        {reserveModalOpen&&        
        <ClassReserve
          teacherDetails={teacherDetails}
          show={reserveModalOpen} 
          handleClose={handleReserveClose}
         />
         }
      </div> 



      <div className="introduction-container">
        
       <div className="self-introduction">
      <div className="self-introduction-title" >
        <h6 className="title" >簡介</h6>
        <span className="expand-icon"
                onClick={() => setIsSelfIntroExpanded(!isSelfIntroExpanded)}>
                {isSelfIntroExpanded ? "收合" : "打開"}
              </span>
      </div>
      

      <p className={`self-info-description ${
        isSelfIntroExpanded ? "expanded" : "collapsed"
      }`}> {isSelfIntroExpanded && (
            <p className="self-info-description">{teacherDetails.selfIntro}</p>
          )}</p>
        </div>     
        
        </div>       
      
      
      <div className="teacherstyle-container">
        <div className="self-teaching-style">
      <div className="self-teaching-style-title">
        <h6 className="title">教學風格</h6>
         <span className="expand-icon"
                onClick={() => setIsTeachStyleExpanded(!isTeachStyleExpanded)}>
                {isTeachStyleExpanded ? "收合" : "打開"}
              </span>       
      </div>
      
      <p className={`self-teaching-style-description ${
        isTeachStyleExpanded ? "expanded" : "collapsed"
      }`} >{isTeachStyleExpanded && (
            <p className="self-info-description">{teacherDetails.teachStyle}</p>
          )}</p>
    </div>
      </div>

      <div className="classtime-container">

      <div className="self-class-time">
      <div className="self-class-time-title" >
        <h6 className="title">授課時間</h6>
        <span className="expand-icon"
                onClick={() => setIsCalendarExpanded(!isCalendarExpanded)}>
                {isCalendarExpanded ? "收合" : "打開"}
              </span>        
      </div>
      
          {/* 日曆待修改 */}
      <div className="self-class-time-calendar" style={{width:'100%'}}>
          <p className={`self-class-time-description ${
        isCalendarExpanded ? "expanded" : "collapsed"
      }`}> {isCalendarExpanded && (
             <MyCalendar teacherDetails={teacherDetails}/>
          )}</p>

       
      </div>
      </div>

      </div>

      <div className="notice-container">
      <div className="teacher-notice">
      <div className="teacher-notice-title">
        <h6 className="title">常見問題</h6>
        <span className="expand-icon"
                onClick={() => setIsNoticeExpanded(!isNoticeExpanded)}>
                {isNoticeExpanded ? "收合" : "打開"}</span>        
      </div>
      
      <p className={`teacher-notice-description ${
        isNoticeExpanded ? "expanded" : "collapsed"
      }`} >
        {isNoticeExpanded && (
          <>
           <ul className='teacher-notice-description-item'>
        <li>預約方式</li>
        <ul>
          <li className='item'>可依照教師行事曆的時間預約課程</li> 
        </ul>
                   
        </ul>
        <ul className='teacher-notice-description-item'>
        <li >上課時間說明</li>
        <ul>
          <li className='item'>正式課程課時約為 30 分鐘 / 60 分鐘</li>     
        </ul>
               
        </ul>
        <ul className='teacher-notice-description-item'>
        <li>上課說明</li>
        <ul>
        <li className='item'>開課前 10 分鐘進入網站，點選『頭像』找到該堂課並點選，再點選『開始上課』，即可開啟 ZOOM 教室開始上課</li> 
        <li className='item'>手機、電腦皆可使用 ZOOM 上課（手機請先下載 ZOOM 應用程式）</li>
                  
        </ul>
           
        </ul>
        <ul className='teacher-notice-description-item'>
        <li>退課須知</li>
        <ul>
        <li className='item'>於正式開課前點選『頭像』找到該堂課並點選，再點選『取消預約』，皆可退還 100% 全額課程費用</li>           
        </ul>
           
        </ul>  
        </>        
          )}

           

      </p>
    </div>
      </div>

    </div>
        </div>

        <div className="form-right col-12 col-md-3 col-lg-3" >
          
  
           <div>
            <ClassComments teacherDetails={teacherDetails} />
           </div>
            


      
        </div>
      </div>
    </div>
  );
};

TeachersPage.propTypes = {
  teacherDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    nation: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    selfIntro: PropTypes.string.isRequired,
    teachStyle: PropTypes.string.isRequired,
   ratingAverage: PropTypes.string.isRequired,
    teaching_categories: PropTypes.arrayOf(PropTypes.shape({
      categoryId: PropTypes.number.isRequired,
      Category: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })).isRequired,

    Courses: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      duration:PropTypes.number.isRequired,
      category: PropTypes.shape({
      }).isRequired,
      Registrations: PropTypes.shape({
        rating:PropTypes.number.isRequired,
        comment:PropTypes.string.isRequired,
      }).isRequired,
    })).isRequired,
  }),
};

export default TeachersPage;