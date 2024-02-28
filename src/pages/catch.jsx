import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import NationImg from '../assets/images/svg/canada.svg'
import ClassComments from '../components/ClassComments';
// import MyCalendar from '../components/Teacher_profile_Calendar';
import '../assets/scss/teacher.scss';
// import ClassReserve from '../components/ClassReserve';
import SuccessModal from '../components/SuccessModal';
import FailModal from '../components/FailModal.jsx';
import axios from 'axios';

const TeachersPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [reserveDays, setReserveDays] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const [selectedTime ,setSelectedTime]=useState('12:00');
  const [teacherDetails, setTeacherDetails] = useState(null);
  const { id } = useParams();
  const api = 'http://34.125.232.84:3000';
  

 useEffect(() => {

    const fetchTeacherData = async()=> {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${api}/teacher/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        console.log(`${api}/teacher/${id}`)
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

// const { mon, tue, wed, thu, fri, sat, sun } = teacherDetails || {};

// // 合併成一個名為 reserveDays 的物件
// const reserveDay = { mon, tue, wed, thu, fri, sat, sun };

// // 現在 reserveDays 就是包含所有屬性的物件
// console.log(reserveDay);


    const handleSubmit = () => {
    const formData = {
      selectedDate,
      selectedCategory,
      selectedTime,
      // 其他表單資料...
    };
    console.log('Submit:', formData);

     const isReservationSuccessful = selectedDate !== '' && selectedTime !== null && selectedCategory !== '';
     const isReservationFail = selectedDate === '' || selectedTime === null || selectedCategory === '';       

    if (isReservationSuccessful) {
        setShowSuccessModal(true);
      } else if (isReservationFail){
        setShowFailModal(true);
      }
    };

    // console.log('showFailModal',showFailModal);
    // console.log('showSuccessModal',showSuccessModal);
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseFailModal = () => {
    setShowFailModal(false);
  };

  const checkIfDateIsSelectable = (date, reserveDays) => {
  const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const selectedDayOfWeek = daysOfWeek[date.getDay()].toLowerCase(); // 轉換為小寫
    return reserveDays[selectedDayOfWeek];
  };

  const handleDateChange = (date) => {
    console.log('Selected Date:', date);

    if (teacherDetails && teacherDetails.reserveDays) {
      const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
      const selectedDayOfWeek = daysOfWeek[date.getDay()];
      const isSelectable = teacherDetails.reserveDays[selectedDayOfWeek];

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
      .map((category) => ({ label: category }))
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
          <ClassComments TeacherDetails={teacherDetails} />
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