//classReseve.jsx

import { Button } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import '../assets/scss/teacherpage.scss';
import '../assets/scss/reservecalendar.scss';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';


const ClassReserve = ({ 
  selectedCategory,
  selectedDate,
  selectedTime,
  setSelectedTime,
  categoryOptions,
  checkIfDateIsSelectable,
  handleSubmit,
  handleDateChange,
  setSelectedCategory,
  teacherDetails,
  setSelectedDuration,
  selectedDuration,
  setSelectedCourse,
  selectedCourse,
  courseOptions,
  isSelectable }) => {

  return (
    <div className="class-reserve">
      <div className="calendar">
      <Calendar
          onChange={handleDateChange} // 將選擇的日期傳遞給 handleDateChange
          value={selectedDate}
          filterDate={(date) => checkIfDateIsSelectable(date, teacherDetails.reserveDays)}
          locale="en-US"
        />
      </div>
      <div className="timepicker">

      <TimePicker
          onChange={(time) => setSelectedTime(time)} // 將選擇的時間傳遞給 setSelectedTime
          value={selectedTime}
          hideDisabledOptions={true}
        />
      </div>
      <div className="select-option">

      <Select
        options={courseOptions}
        onChange={(selectedCourse) => setSelectedCourse (selectedCourse)}
        value={selectedCourse}
        placeholder="選擇課程名稱"
      />        
        
      <Select
        options={categoryOptions}
        onChange={(selectedOption) => setSelectedCategory (selectedOption)}
        value={selectedCategory}
        placeholder="選擇課程類別"
      />

        <Select
      options={[
      { value: 30, label: '30 分鐘' },
      { value: 60, label: '60 分鐘' },
    ]}
        onChange={(selectedOption) => setSelectedDuration (selectedOption)}
        value={selectedDuration}
        placeholder="選擇課程時間"
      />
      
      </div> 

      <div className="btn-submit">

      <Button className="submit btn-light" onClick={handleSubmit}>
        預約課程
      </Button>
      </div>



    </div>
  );
};

ClassReserve.propTypes = {
  selectedTime: PropTypes.string.isRequired,
  setSelectedTime: PropTypes.func.isRequired,
  selectedDuration:PropTypes.string.isRequired,
  setSelectedDuration:PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  categoryOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  isSelectable: PropTypes.bool.isRequired,
  teacherDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    nation: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    selfIntro: PropTypes.string.isRequired,
    teachStyle: PropTypes.string.isRequired,
    ratingAverage: PropTypes.string.isRequired,
    reserveDays:PropTypes.object.isRequired,
    Courses: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        Registrations: PropTypes.shape({
          rating: PropTypes.number.isRequired,
          comment: PropTypes.string.isRequired,
        }).isRequired,
        category: PropTypes.shape({}).isRequired,
        duration:PropTypes.number.isRequired,
      })
    ).isRequired,
  }),
  handleSubmit: PropTypes.func.isRequired,
  checkIfDateIsSelectable: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default ClassReserve;