//teacherpage

import { useParams } from "react-router-dom";
import NationImg from '../assets/images/svg/canada.svg';
import '../assets/scss/teacherpage.scss'
import MyCalendar from "../components/Teacher_profile_Calendar";
import PropTypes from 'prop-types';
import ClassComments from "../components/ClassComments";
import ClassReserve from '../components/ClassReserve.jsx';
import TeacherEditInfo from "../components/TeacherEditModal";
import { useState ,useEffect } from "react";
import '../assets/scss/teacher.scss';
import { Button } from "react-bootstrap";
import axios from "axios";
import SuccessModal from '../components/SuccessModal';
import FailModal from '../components/FailModal.jsx';


const TeachersPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [reserveDays, setReserveDays] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const [selectedTime ,setSelectedTime]=useState('12:00');
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState('');
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

const { mon, tue, wed, thu, fri, sat, sun } = teacherDetails || {};
// 合併成一個名為 reserveDays 的物件
const reserveDay = { mon, tue, wed, thu, fri, sat, sun };
// 現在 reserveDays 就是包含所有屬性的物件

const categoryMapping = {
  "多益": 1,
  "托福": 2,
  "雅思": 3,
  "商用英文":4,
  "旅遊英文":5,
};

const handleSubmit = async () => {
    const apiFormattedData = {
    teacherId: parseInt(teacherDetails.id, 10), 
    categoryId: JSON.stringify(selectedCategory.id),
    name: selectedCategory.label,
    intro: "123",
    link: "https://naughty-laborer.info/",
    duration: parseInt(selectedDuration.value, 10),
    startAt: `${selectedDate.toISOString().slice(0, 10)} ${selectedTime}`,
  };
  console.log(apiFormattedData);
 try {
    const token = localStorage.getItem('token');

    // Make a POST request to the /course endpoint
    const response = await axios.post(
      `${api}/course`,
      apiFormattedData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log('Course creation response:', response.data);

    // Check the response and show success or fail modal
    if (response.data.success) {
      setShowSuccessModal(true);
    } else {
      setShowFailModal(true);
    }
  } catch (error) {
    console.error('Course creation error:', error.message);
    setShowFailModal(true);
  }
};

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseFailModal = () => {
    setShowFailModal(false);
  };


  const checkIfDateIsSelectable = (date, reserveDay) => {
  const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const selectedDayOfWeek = daysOfWeek[date.getDay()].toLowerCase(); // 轉換為小寫
  console.log('Checktime:',selectedDayOfWeek);
  return reserveDay[selectedDayOfWeek];
    
  };

  const handleDateChange = (date) => {
    console.log('Selected Date:', date);

    if (teacherDetails && reserveDay) {
      const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
      const selectedDayOfWeek = daysOfWeek[date.getDay()];
      const isSelectable = reserveDay[selectedDayOfWeek];
      console.log('isselectable',isSelectable)

      if (isSelectable) {
        setSelectedDate(date);
      } else {
        alert('該日期不可預約');
      }
    } else {
      alert('無法獲取教師的預約日期信息');
    }
  };

  const handleTimeChange = (time) => {
  setSelectedTime(time);
   console.log('Selected Time:', time);
  };

const categoryOptions = teacherDetails
  ? [...new Set(teacherDetails.Courses.map(course => course.category).flat())]
      .map((category) => ({ label: category , id:categoryMapping[category] }))
  : [];

  return ( 
      <div>
    
      <div className="div-container col col-12" >
        <div className="form-left col col-9" >

              

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
   {[...new Set(teacherDetails.Courses.map(course => course.category).flat())]
      .map((category, index) => (
        <span className="self-teacher-item" key={index}>{category}</span>
      ))}
                    </div>
                </div>
                 

             </div>

              </div> 

      <div className="introduction-container">
        
       <div className="self-introduction">
      <div className="self-introduction-title" >
        <h6 className="title">簡介</h6>
      </div>
      

      <p className="self-info-description">{teacherDetails.selfIntro}</p>
        </div>     
        
        </div>       
      
      
      <div className="teacherstyle-container">
        <div className="self-teaching-style">
      <div className="self-teaching-style-title">
        <h6 className="title">教學風格</h6>
      </div>
      
      <p className="self-teaching-style-description" >{teacherDetails.teachStyle}</p>
    </div>
      </div>

      <div className="classtime-container">

      <div className="self-class-time">
      <div className="self-class-time-title" >
        <h6 className="title">授課時間</h6>
      </div>
      
          {/* 日曆待修改 */}
      <div className="self-class-time-calendar">
        {/* <MyCalendar /> */}
      </div>
      </div>

      </div>

      <div className="notice-container">
      <div className="teacher-notice">
      <div className="teacher-notice-title">
        <h6 className="title">常見問題</h6>
      </div>
      
      <p className="teacher-notice-description" >
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

      </p>
    </div>
      </div>

    </div>
        </div>

        <div className="form-right col col-3" >
          
      
          <div>
        <ClassReserve
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={handleTimeChange}
          setSelectedCategory={setSelectedCategory}
          selectedDuration={selectedDuration}
          setSelectedDuration={setSelectedDuration}
          reserveDays={reserveDays}
          setReserveDays={setReserveDays}
          teacherDetails={teacherDetails}
          handleSubmit={handleSubmit}
          categoryOptions={categoryOptions}
          setShowSuccessModal={setShowSuccessModal}
          setShowFailModal={setShowFailModal}
          handleDateChange={handleDateChange}
          checkIfDateIsSelectable={checkIfDateIsSelectable}
         />
           </div>
           <div>
            <ClassComments teacherDetails={teacherDetails} />
           </div>
            
      <FailModal show={showFailModal} handleClose={handleCloseFailModal} />
      <SuccessModal show={showSuccessModal} handleClose={handleCloseSuccessModal} />
      
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