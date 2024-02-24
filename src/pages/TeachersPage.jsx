import { useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import NationImg from '../assets/images/svg/canada.svg'
import Navbar from '../components/Navbar';
import ClassComments from '../components/ClassComments';
import MyCalendar from '../components/Teacher_profile_Calendar';
import '../assets/scss/teacher.scss';
import ClassReserve from '../components/ClassReserve';
import SuccessModal from '../components/SuccessModal';
import FailModal from '../components/FailModal.jsx';
import { getTeacher } from '../api/teacher.js';
import { useAuth } from '../components/AuthContext.jsx';


const TeachersPage = () => {
  const [selectedTeacher,setSelectedTeacher] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [reserveDays, setReserveDays] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const [searchTerm,setSearchTerm]= useState('');
  const [selectedTime ,setSelectedTime]=useState('12:00');
  const { id } = useParams();
  const { user, isUserLoggedIn } = useAuth();
  const history = useNavigate();


  useEffect(() => {
    // 如果用户未登录，进行路由跳转到登录页面
    
    if (!isUserLoggedIn()) {
      history.push('/signin'); // 根据实际的登录页面路由进行修改
    }
  }, [isUserLoggedIn, history]);

 useEffect(() => {
  const fetchTeacherData = async () => {
    try {
      
      const teacherData = await getTeacher(id);
      console.log('Teacher Data:', teacherData);
      setSelectedTeacher(teacherData);
      setReserveDays({
        mon: teacherData.mon,
        tue: teacherData.tue,
        wed: teacherData.wed,
        thu: teacherData.thu,
        fri: teacherData.fri,
        sat: teacherData.sat,
        sun: teacherData.sun,
      });
    } catch (error) {
      console.error('Failed to fetch teacher data:', error);
    }
  };

  fetchTeacherData();
}, [id]);

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

    console.log('showFailModal',showFailModal);
    console.log('showSuccessModal',showSuccessModal);
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

    if (selectedTeacher && selectedTeacher.reserveDays) {
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const selectedDayOfWeek = daysOfWeek[date.getDay()];
      const isSelectable = selectedTeacher.reserveDays[selectedDayOfWeek];

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

  const categoryOptions = selectedTeacher.Courses.map((course) => ({ label: course.Category.name }));



  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Navbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <div className="div-container col col-12" >
        <div className="form-left col col-9" >

       
        {selectedTeacher && (
        
            <div key={selectedTeacher.id} >

              <div className="card-container" >

              <div className="self-card-container">
      
              <img className="self-card-img" src={selectedTeacher.avatar} alt={selectedTeacher.name} />

              <div className="self-info-container" >

              <div className="self-name-nation-container" >
              <div className="self-nation" >
               <img src={NationImg} alt={selectedTeacher.nation} />
                <h6 className="self-name">{selectedTeacher.name}</h6>
              </div>
              </div>
                <div className="self-category-container">        
                  <div className="self-category">
                    {selectedTeacher.Courses.map((course, index) => (
        <div className="self-teacher-item" key={index}>{course.Category.name}</div>
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
      

      <p className="self-info-description">{selectedTeacher.selfIntro}</p>
        </div>     
        
        </div>       
      
      
      <div className="teacherstyle-container">
        <div className="self-teaching-style">
      <div className="self-teaching-style-title">
        <h6 className="title">教學風格</h6>
      </div>
      
      <p className="self-teaching-style-description" >{selectedTeacher.teachStyle}</p>
    </div>
      </div>

      <div className="classtime-container">

      <div className="self-class-time">
      <div className="self-class-time-title" >
        <h6 className="title">授課時間</h6>
      </div>
      
          {/* 日曆待修改 */}
      <div className="self-class-time-calendar">
        <MyCalendar />
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



          )}
        </div>

        <div className="form-right col col-3" >
          
          {selectedTeacher && (
          <div>
        <ClassReserve
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={handleTimeChange}
          setSelectedCategory={setSelectedCategory}
          reserveDays={reserveDays}
          setReserveDays={setReserveDays}
          selectedTeacher={selectedTeacher}
          handleSubmit={handleSubmit}
          categoryOptions={categoryOptions}
          setShowSuccessModal={setShowSuccessModal}
          setShowFailModal={setShowFailModal}
          handleDateChange={handleDateChange}
          checkIfDateIsSelectable={checkIfDateIsSelectable}
         />
          <ClassComments teacher={selectedTeacher} />
           </div>
              
            
          )}
      <FailModal show={showFailModal} handleClose={handleCloseFailModal} />
      <SuccessModal show={showSuccessModal} handleClose={handleCloseSuccessModal} />
      
        </div>
      </div>
    </>
  );
};

TeachersPage.propTypes = {
  selectedTeacher: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    nation: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    selfIntro: PropTypes.string.isRequired,
    teachStyle: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    Courses: PropTypes.arrayOf(PropTypes.shape({
      Category: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })).isRequired,
  }).isRequired,
};

export default TeachersPage;