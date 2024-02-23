import { useState } from 'react';
import { useParams } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import NationImg from '../assets/images/svg/canada.svg'
import Navbar from '../components/Navbar';
import { DummyTeachers } from '../components/TeachersData';
import ClassComments from '../components/ClassComments';
import MyCalendar from '../components/Teacher_profile_Calendar';
import '../assets/scss/teacher.scss';
import ClassReserve from '../components/ClassReserve';
import SuccessModal from '../components/SuccessModal';
import FailModal from '../components/SuccessModal';


const TeachersPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [reserveDays, setReserveDays] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const [searchTerm,setSearchTerm]= useState('');
  const [selectedTime ,setSelectedTime]=useState('12:00');
  const { teacher_id } = useParams();
  const selectedTeacher = DummyTeachers.find((teacher) => teacher.teacher_id === String(teacher_id));

    const handleSubmit = () => {
    const formData = {
      selectedDate,
      selectedCategory,
      selectedTime,
      // 其他表單資料...
    };
    console.log('Submit:', formData);
    const isReservationSuccessful = selectedDate && selectedTime & selectedCategory !== '';
    if (isReservationSuccessful) {
        setShowSuccessModal(true);
      } else {
        handleOpenFailModal();
      }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleOpenFailModal = () => {
    setShowFailModal(true);
  };

  const handleCloseFailModal = () => {
    setShowFailModal(false);
  };

  const checkIfDateIsSelectable = (date, reserveDays) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const selectedDayOfWeek = daysOfWeek[date.getDay()];
    return reserveDays[selectedDayOfWeek];
  };

  let dateLogCounter = 0;

  const handleDateChange = (date) => {
    console.log('Selected Date:', date);

    if (selectedTeacher && selectedTeacher.courses) {
      let isSelectable = false;

      for (const course of selectedTeacher.courses) {
        if (course.reserveDays) {
          const isCourseSelectable = checkIfDateIsSelectable(date, course.reserveDays);

          if (dateLogCounter < 10) {
            console.log('Is Course Selectable:', isCourseSelectable);
            dateLogCounter++;
          }

          if (isCourseSelectable) {
            isSelectable = true;
            break;
          }
        }
      }

      if (isSelectable) {
        setSelectedDate(date);
      } else {
        alert('該日期不可預約');
      }
    } else {
      alert('無法獲取課程信息');
    }
  };

  const handleTimeChange = (time) => {
  setSelectedTime(time);
   console.log('Selected Time:', time);
  };

  const categoryOptions = selectedTeacher.category.map((category) => ({ label: category }));


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
                    {selectedTeacher.category.map((category, index) => (
                <div className="self-teacher-item" key={index}>{category}</div>
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
      

      <p className="self-info-description">{selectedTeacher.info}</p>
        </div>     
        
        </div>       
      
      
      <div className="teacherstyle-container">
        <div className="self-teaching-style">
      <div className="self-teaching-style-title">
        <h6 className="title">教學風格</h6>
      </div>
      
      <p className="self-teaching-style-description" >{selectedTeacher.teaching_style}</p>
    </div>
      </div>

      <div className="classtime-container">

      <div className="self-class-time">
      <div className="self-class-time-title" >
        <h6 className="title">授課時間</h6>
      </div>
      

      <div className="self-class-time-calendar" style={{fontSize:'14px',maxWidth:'50%'}}>
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

        <div className="form-right col col-3" style={{display:'flex',flexDirection:'column'}}>
          
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
          handleOpenFailModal={handleOpenFailModal}
          checkIfDateIsSelectable={checkIfDateIsSelectable}
         />
          <ClassComments teacher={selectedTeacher} />
           </div>
              
            
          )}

      <SuccessModal show={showSuccessModal} handleClose={handleCloseSuccessModal} />
      <FailModal show={showFailModal} handleClose={handleCloseFailModal} />
        </div>
      </div>
    </>
  );
};

TeachersPage.propTypes = {
  teacher: PropTypes.shape({
    name: PropTypes.string.isRequired,
    teacher_id: PropTypes.string.isRequired,
    nation: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    teaching_style: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    category: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default TeachersPage;