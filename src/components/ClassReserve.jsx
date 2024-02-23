
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
  selectedTeacher }) => {

  return (
    <div className="class-reserve">
      <div className="calendar">
      <Calendar
          onChange={handleDateChange} // 將選擇的日期傳遞給 handleDateChange
          value={selectedDate}
          filterDate={(date) => checkIfDateIsSelectable(date, selectedTeacher.courses[0].reserveDays)}
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
        options={categoryOptions}
        onChange={(selectedOption) => setSelectedCategory (selectedOption)}
        value={selectedCategory}
        placeholder="選擇課程類別"
      />
      
      </div> 

      <div className="btn-submit">

      <Button className="btn-light" style={{ margin: '2rem 0 2rem 0' }} onClick={handleSubmit}>
        預約課程
      </Button>
      </div>



    </div>
  );
};

ClassReserve.propTypes = {
  selectedTime: PropTypes.string,
  setSelectedTime: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  categoryOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedTeacher: PropTypes.shape({
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        reserveDays: PropTypes.object.isRequired,
      })
    ),
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  checkIfDateIsSelectable: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default ClassReserve;