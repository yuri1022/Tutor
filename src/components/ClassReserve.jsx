//classReseve.jsx

import { Button } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import '../assets/scss/teacherpage.scss';
import { Modal } from 'react-bootstrap';
import { Calendar,momentLocalizer,Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useState,useEffect } from 'react';
import LeftArrow from '../assets/images/svg/arrow-left.svg';
import RightArrow from '../assets/images/svg/arrow-right.svg';
import '../assets/scss/teachercalendar.scss';
import axios from 'axios';
import SuccessModal from './SuccessModal.jsx';
import FailModal from './FailModal.jsx';


const ClassReserve = ({ 
  teacherDetails,
  show,
  handleClose }) => {


const localizer = momentLocalizer(moment);
const [disableMonthNavigation, setDisableMonthNavigation] = useState(false);
const [selectedCourse, setSelectedCourse] = useState('');
const [selectedDuration, setSelectedDuration] = useState('');
const [selectedCourseId, setSelectedCourseId] = useState('');
const [showSuccessModal, setShowSuccessModal] = useState(false);
const [showFailModal, setShowFailModal] = useState(false);
const [successReservationData, setSuccessReservationData] = useState(null);

 const dayFormat = (date, culture, localizer) =>
  localizer.format(date, 'ddd', culture); // 格式化日期为星期几的缩写

 
  // 根據已預約名單標識是否已預約
const events = teacherDetails.Courses.flatMap(course => {
  const start = moment(course.startAt)
  const end = moment(course.startAt).add(course.duration, 'minutes'); 
    const isReserved = course.Registrations.some(registration => registration.rating !== null);

  return {
    start: start.toDate(),
    end: end.toDate(),
    title: course.name,
    id:course.id,
    reserved: isReserved,
    duration:course.duration,  
    date:course.startAt,
    allDay:true
  };
});

const handleInputCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

const handleInputDurationChange = (event) => {
    setSelectedDuration(event.target.value);
  };

const handleInputCourse = (event) =>{
  setSelectedCourseId(event.target.value)
}


  const handleEventClick = (events) => {
    // 在這裡根據點擊的事件更新 selectedCourse 的值
    setSelectedCourse(events.title);
    setSelectedDuration(events.duration);
    setSelectedCourseId(events.id);
  };





const handleSubmit = async () => {
 try {

    if (!selectedCourseId) {
      // 處理未選擇課程的情況
      console.error('請選擇課程');
      return;
    }
  const selectedEvent = events.find(event => event.id === selectedCourseId);
  const { title, date, start, end } = selectedEvent;

    const token = localStorage.getItem('token');
    const courseId = selectedCourseId

    const api = 'http://34.125.232.84:3000';
    // Make a POST request to the /course endpoint
    const response = await axios.post(
      `${api}/register/${courseId}`,{},
 {
    headers: { 
      Authorization: `Bearer ${token}`
    } 
  }
    );

    console.log('Course creation response:', response);

    // Check the response and show success or fail modal
    if (response.data.status=== 'success') {
      
       setSuccessReservationData({
        courseName: title,
        date: `${moment(date).format('YYYY-MM-DD')}`,
        time: `${moment(start).format('HH:mm')}-${moment(end).format('HH:mm')}`,
      });

      setShowSuccessModal(true);
    } else {
      setShowFailModal(true);
    }
  } catch (error) {
    console.error('Course creation error:', error.message);
    setShowFailModal(true);
  }
};
useEffect(() => {
  
}, [successReservationData]);


  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };


  const handleCloseFailModal = () => {
    setShowFailModal(false);
  };



const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    const newDate = moment(toolbar.date);
    toolbar.onNavigate('PREV', newDate);
  };

  const goToNext = () => {
    const newDate = moment(toolbar.date);
    toolbar.onNavigate('NEXT', newDate);
  };

useEffect(() => {
  const parentElements = document.querySelectorAll('.rbc-row-bg');

  parentElements.forEach(parent => {
    const dateCells = parent.querySelectorAll('.rbc-day-bg');
    const startDate = moment(toolbar.date).startOf('week');

    dateCells.forEach((cell, i) => {
      const formattedDate = startDate.clone().add(i, 'days').format('DD');
      cell.setAttribute('data-date', formattedDate);
    });
  });
}, [toolbar.date]);

  return (
    <div  className="rbc-toolbar" >

      <div className="rbc-toolbar-top" >

      <span className="rbc-btn-group-year">
        <button type="button" className="year-control" onClick={goToBack}>
          <img src={LeftArrow} alt="" />
        </button>           
        <button type="button" className="year-control" onClick={goToNext}>
          <img src={RightArrow} alt="" />
        </button>
      </span>


      </div>

      <div className="reserve">
        <span style={{marginRight:'1rem'}}>可預約</span>
        <span>不可預約</span>
      </div>

    </div>

  );
};

  const EventComponent = ({ event }) => {
    const start = moment(event.start).format('HH:mm');
    return (
      <div className={event.reserved ? 'reserved' : 'not-reserved' }  onClick={() => handleEventClick(event)}>
        {`${start}`}    </div>
    );
  };

  // 添加 PropTypes
EventComponent.propTypes = {
  event: PropTypes.shape({
    start:PropTypes.instanceOf(Date).isRequired,
    end:PropTypes.instanceOf(Date).isRequired,
    reserved: PropTypes.bool.isRequired,
  }).isRequired,
};



  return (
    <Modal show={show} onHide={handleClose} size='sm'>
    <Modal.Body>  
     <div className="class-reserve" style={{ width:'100%' }}>
      <div className="calendar">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
       formats={{ dayFormat }}
        components={{
          toolbar: CustomToolbar,
            event: EventComponent,
        }}
      defaultView={Views.WEEK} // 將預設視圖設為 Week
      allDayMaxRows='3'
           />


      </div>


      <div className="select-submit" style={{width:'100%',textAlign:'center',margin:'1rem 0 1rem 0'}}>
        <div className="select-item d-flex" style={{marginBottom:'1rem',justifyContent:'center'}}>




        <div style={{background:'var(--main-blue)',color:'white',padding:'0.5rem',borderRadius:'0.5rem 0 0 0.5rem',boxShadow: '0px 4px 4px 2px rgba(54, 82, 227, 0.25)'}}>課程名稱</div>
          <input style={{width:'20.5rem',fontSize:'0.875rem',borderRadius:'0 0.5rem 0.5rem 0',border:'none',boxShadow: '0px 4px 4px 2px rgba(54, 82, 227, 0.25)'}}
      onChange={(selectedCourse) => handleInputCourseChange (selectedCourse)}
        value={selectedCourse}
        placeholder="Please Click Date To Check Course Name"
        readOnly
      />  

        </div>
        <div className="select-item d-flex" style={{marginBottom:'1rem',justifyContent:'center'}}>
          
        <div style={{background:'var(--main-blue)',color:'white',padding:'0.5rem',borderRadius:'0.5rem 0 0 0.5rem',boxShadow: '0px 4px 4px 2px rgba(54, 82, 227, 0.25)'}}>課程時長</div>
      <input style={{width:'20.5rem',fontSize:'0.875rem',borderRadius:'0 0.5rem 0.5rem 0',border:'none',boxShadow: '0px 4px 4px 2px rgba(54, 82, 227, 0.25)'}}
      onChange={(selectedDuration) => handleInputDurationChange (selectedDuration)}
      value={selectedDuration}
       placeholder="Please Click Date To Check Course Duration"
        readOnly
      />
      
        </div>  
        <div className="btn-submit" >

      <Button className="submit btn-light" style={{width:'25rem',background:'linear-gradient(#1AEAEA,#3652E3)',border:'none',color:'var(--white)'}} onClick={handleSubmit}>
        預約課程
      </Button>
         </div>

    <FailModal show={showFailModal} handleClose={handleCloseFailModal} />
     {successReservationData&& <SuccessModal show={showSuccessModal} handleClose={handleCloseSuccessModal} successReservationData={successReservationData}/>        }
        
      </div>
  
        


      </div>    
    </Modal.Body>




    </Modal>
  );
};

ClassReserve.propTypes = {
  handleDateChange: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
  teacherDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    nation: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    selfIntro: PropTypes.string.isRequired,
    teachStyle: PropTypes.string.isRequired,
    ratingAverage: PropTypes.string.isRequired,
    Courses: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
};

export default ClassReserve;