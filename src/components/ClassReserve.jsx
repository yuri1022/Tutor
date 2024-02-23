
import { Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import PropTypes from 'prop-types';


const ClassReserve = ({ selectedCategory,selectedDate,categoryOptions,checkIfDateIsSelectable,handleSubmit,handleDateChange,setSelectedCategory,selectedTeacher }) => {

  return (
    <div className="teacher-reserve" style={{ width: '70%' }}>
      <div>
        <h3 className="teacher-reserve-title" style={{ backgroundColor: '#f3f3f3', textAlign: 'center', fontWeight: '600' }}>
          預約上課
        </h3>
      </div>
       <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        filterDate={(date) => checkIfDateIsSelectable(date, selectedTeacher.courses[0].reserveDays)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={30}
        timeCaption="Time"
      />
      <Select
        options={categoryOptions}
        onChange={(selectedOption) => setSelectedCategory (selectedOption)}
        value={selectedCategory}
        placeholder="選擇課程類別"
      />
      <Button className="btn-info" style={{ margin: '8% 0 0 2%' }} onClick={handleSubmit}>
        預約
      </Button>

    </div>
  );
};

ClassReserve.propTypes = {
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