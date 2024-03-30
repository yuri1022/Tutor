import { memo } from 'react'
import { useRef,useEffect,useState } from 'react';
import { Calendar, momentLocalizer,Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import PropTypes from 'prop-types';
import '../assets/scss/reservecalendar.scss';
import LeftArrow from '../assets/images/svg/arrow-left.svg';
import RightArrow from '../assets/images/svg/arrow-right.svg';
import { Button } from 'react-bootstrap';
import AddCourse from './AddCourse';
import PutCourse from './PutCourse';

const localizer = momentLocalizer(moment);


const MyCalendar = memo(({ teacherDetails, isEditCourse, handleEditCourse, closeEditCourse }) => {
const [editedCourse, setEditedCourse] = useState(null);
const [showPlusButton, setShowPlusButton] = useState(false);
const [reloadCoursesFlag, setReloadCoursesFlag] = useState(false);

 const handleSaveCourse = () => {
    handleEditCourse(editedCourse);
    closeEditCourse();
  };

  const handleCancelEdit = () => {
    closeEditCourse();
  };

 
 const dayFormat = (date, culture, localizer) =>
    localizer.format(date, 'ddd', culture); 

const [eventsChanged, setEventsChanged] = useState(false);


const events = teacherDetails.Courses.flatMap(course => {
  const start = moment(course.startAt)
  const end = moment(course.startAt).add(course.duration, 'minutes'); 
  const isReserved = course.Registrations && course.Registrations.length > 0;

  return {
    start: start.toDate(),
    end: end.toDate(),
    duration:course.duration,
    category:course.category,
    title: course.name,
    intro:course.intro,
    link:course.link,
    reserved: isReserved,
    allDay:true,  
    courseId:course.id,
  };
});

  useEffect(() => {
    console.log('Teacher details have changed:', teacherDetails);
    // 这里可以处理需要重新渲染的逻辑，比如更新其他组件状态、执行其他操作等
  }, [teacherDetails, eventsChanged]);

const categoryMap = {};
teacherDetails.teaching_categories.forEach(category => {
  categoryMap[category.Category.name] = category.categoryId;
});

const eventsWithCategoryId = events.map(event => ({
  ...event,
  categoryId: categoryMap[event.category],
}));


const CustomToolbar = (toolbar) => {
const [showAddModal, setShowAddModal] = useState(false);

 const handleYearChange = (event) => {
    const newYear = parseInt(event.target.value, 10);
    const newDate = moment(toolbar.date).set('year', newYear);
    toolbar.onNavigate('DATE', newDate);
  };

  const handleMonthChange = (event) => {
    const newMonth = parseInt(event.target.value, 10);
    const newDate = moment(toolbar.datel).set('month', newMonth);
    toolbar.onNavigate('DATE', newDate);
  };



 const handlePlusClick = () => {
    setShowAddModal(true);
  };

  const handleClose = () => {
    setShowAddModal(false);
  };

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
  const startDate = moment(toolbar.date).startOf('week');

  dateCells.forEach((cell, index) => {
    const formattedDate = startDate.clone().add(index, 'days').format('DD');
    cell.setAttribute('data-date', formattedDate);

    const existingButton = cell.querySelector('.create-course');
    if (existingButton) {
      cell.removeChild(existingButton);
    }

    if (isEditCourse) {
      const addButton = document.createElement('button');
      addButton.textContent = '+';
      addButton.classList.add('create-course');
      addButton.addEventListener('click', handlePlusClick);

      cell.appendChild(addButton);
    }
  });
}, [toolbar.date, isEditCourse]);


  useEffect(() => {
    setShowPlusButton(true); 
  }, [isEditCourse]); 



  return (
    <div className="rbc-toolbar" >

      <div className="rbc-toolbar-top" >

       <span className="rbc-btn-group-month">
        <select value={moment(toolbar.date).month()} onChange={handleMonthChange}>
          {moment.months().map((month, index) => (
            <option key={index} value={index}>{month}</option>
          ))}
        </select>
        </span>
        <span className="rbc-btn-group-year">
        <select value={moment(toolbar.date).year()} onChange={handleYearChange}>
          {Array.from({ length: 10 }, (_, i) => moment(toolbar.date).year() - 5 + i).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        </span>
  

      </div>
            <div className="control-states d-flex" style={{justifyContent:'space-between'}}>
      <div className="week-control">

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
        <span>已有預約</span>
      </div>
            </div>



      {showAddModal&&<AddCourse showAddModal={showAddModal} onHide={handleClose} teacherDetails={teacherDetails} reloadCoursesFlag={reloadCoursesFlag}/>}

    </div>

  );
};


  const EventComponent = ({ event }) => {
    const start = moment(event.start).format('HH:mm');
    const [showPutModal, setShowPutModal] = useState(false);

     const eventWithCategoryId = eventsWithCategoryId.find(
    (item) => item.title === event.title
  );
//  console.log(eventWithCategoryId);

    const handlePutClick = () => {
    setShowPutModal(true);
  };

     const handleClose = () => {
    setShowPutModal(false);
  };


    return (
  <div className={event.reserved ? 'reserved' : 'not-reserved'} onClick={isEditCourse ? handlePutClick : null}>
    {`${start}`}{' '}
    {showPutModal && <PutCourse showPutModal={showPutModal} onHide={handleClose} event={eventWithCategoryId} setEventsChanged={setEventsChanged}/>}
  </div>
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
    {isEditCourse?(
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

        <div className='edit-button d-flex' style={{marginTop:'3rem',justifyContent:'end'}}>
        <Button className="btn-cancel" onClick={handleCancelEdit}>取消</Button>
        <Button className="btn-save" onClick={handleSaveCourse}>確定</Button>
        </div>
           </>
           ):(
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
           )}
      
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
      duration: PropTypes.number.isRequired,
      startAt: PropTypes.instanceOf(Date).isRequired,
      category: PropTypes.shape({}).isRequired,
      Registrations: PropTypes.shape({
        rating: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
      }).isRequired,
    })).isRequired,
  }),
};

MyCalendar.displayName = 'MyCalendar';

export default MyCalendar;