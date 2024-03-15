import { memo } from 'react'
import { useRef,useEffect } from 'react';
import { Calendar, momentLocalizer,Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import PropTypes from 'prop-types';
import '../assets/scss/reservecalendar.scss';
import LeftArrow from '../assets/images/svg/arrow-left.svg';
import RightArrow from '../assets/images/svg/arrow-right.svg';

const localizer = momentLocalizer(moment);


const MyCalendar = memo(({teacherDetails}) => {
  
// const [disableMonthNavigation, setDisableMonthNavigation] = useState(false);

 const dayFormat = (date, culture, localizer) =>
    localizer.format(date, 'ddd', culture); // 格式化日期为星期几的缩写
  

const reservedDates = Array.isArray(teacherDetails.Courses)
  ? teacherDetails.Courses.map(course => course.startAt)
  : [];

  console.log(reservedDates)

  // 根據已預約名單標識是否已預約
const events = teacherDetails.Courses.flatMap(course => {
  const start = moment(course.startAt)
  const end = moment(course.startAt).add(course.duration, 'minutes'); 
    const isReserved = course.Registrations.some(registration => registration.rating !== null);

  return {
    start: start.toDate(),
    end: end.toDate(),
    title: course.name,
    reserved: isReserved,
    allDay:true,  
  };
});


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
  const dateCells = document.querySelectorAll('.rbc-day-bg');
  const startDate =  moment(toolbar.date).startOf('week');
 dateCells.forEach((cell, index) => {
      const formattedDate = startDate.clone().add(index, 'days').format('DD');
      cell.setAttribute('data-date', formattedDate);
    });
    
}, [toolbar.date]);


  return (
    <div className="rbc-toolbar" >

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
      <div className={event.reserved ? 'reserved' : 'not-reserved' } >
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
    <>
      <Calendar
      localizer={localizer}
      events={events}
      formats={{ dayFormat }}
        components={{
          toolbar: CustomToolbar,
            event: EventComponent,
        }}
      defaultView={Views.WEEK} // 將預設視圖設為 Week
      allDayMaxRows='3'
           />
    </>
  );
});

MyCalendar.propTypes = {
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
      startAt:PropTypes.instanceOf(Date).isRequired,
      category: PropTypes.shape({
      }).isRequired,
      Registrations: PropTypes.shape({
        rating:PropTypes.number.isRequired,
        comment:PropTypes.string.isRequired,
      }).isRequired,
    })).isRequired,
  }),
};

MyCalendar.displayName = 'MyCalendar';

export default MyCalendar;