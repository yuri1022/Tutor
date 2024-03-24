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
import EditIcon from '../assets/images/svg/edit.svg';
import AddCourse from './AddCourse';
import PutCourse from './PutCourse';

const localizer = momentLocalizer(moment);


const MyCalendar = memo(({ teacherDetails, isEditCourse, handleEditCourse, closeEditCourse }) => {
const [editedCourse, setEditedCourse] = useState(null);
const [showPlusButton, setShowPlusButton] = useState(false);


 const handleSaveCourse = () => {
    handleEditCourse(editedCourse);
    closeEditCourse();
  };

  const handleCancelEdit = () => {
    closeEditCourse();
  };

 
 const dayFormat = (date, culture, localizer) =>
    localizer.format(date, 'ddd', culture); 

const events = teacherDetails.Courses.flatMap(course => {
  const start = moment(course.startAt)
  const end = moment(course.startAt).add(course.duration, 'minutes'); 
    const isReserved = course.Registrations.some(registration => registration.rating !== null);

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


 const handlePlusClick = () => {
    setShowAddModal(true);
  };

  const handleCloseAdd = () => {
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
  }, [showAddModal]);

  useEffect(() => {
    setShowPlusButton(true); 
  }, [isEditCourse]); 


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

      {showAddModal&&<AddCourse showAddModal={showAddModal} onHide={handleCloseAdd} teacherDetails={teacherDetails} />}

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

     const handleClosePut = () => {
    setShowPutModal(false);
  };


    return (
      <div className={event.reserved ? 'reserved' : 'not-reserved'}>
        {`${start}`}{' '}
      {isEditCourse && (
        <>
          <img className="edit-course" src={EditIcon} alt="edit" onClick={handlePutClick} />
          {showPutModal&&<PutCourse showPutModal={showPutModal} onHide={handleClosePut} event={eventWithCategoryId}
/>}
        </>
      )}
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

        <div className='check-buttons' style={{marginTop:'3rem'}}>
        <Button onClick={handleSaveCourse}>確認</Button>
        <Button onClick={handleCancelEdit}>取消</Button>
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