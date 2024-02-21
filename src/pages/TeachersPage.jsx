import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import NationImg from '../assets/images/svg/canada.svg'
import Navbar from '../components/Navbar';
import { DummyTeachers } from '../components/TeachersData';
import SuccessMessage from '../components/successmodal';
import FailMessage from '../components/FailModal';
import ClassComments from '../components/ClassComments';
import MyCalendar from '../components/Teacher_profile_Calendar';
import Select from 'react-select';



const TeachersPage = () => {
  const { teacher_id } = useParams();
  const selectedTeacher = DummyTeachers.find((teacher) => teacher.teacher_id === String(teacher_id));
  const [selectedDate, setSelectedDate] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailModal, setShowFailModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = () => {
    const formData = {
      selectedDate,
      selectedCategory,
      // 其他表單資料...
    };
    console.log('Submit:', formData);

    const isReservationSuccessful = selectedDate && selectedCategory !== '';
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

  const categoryOptions = selectedTeacher.category.map((category) => ({ label: category }));

  return (
    <>
      <Navbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <div className="div-container col col-12" style={{ display:'flex' }}>
        <div className="form-left col col-9" style={{margin:'2% 0 2% 0%'}}>
          {selectedTeacher && (
            <div key={selectedTeacher.id} >

              <div className="card-container" style={{ display: 'flex',flexDirection:'column'}}>

              <div className="self-card-container" style={{display:'flex'}}>
      
              <img src={selectedTeacher.avatar} alt={selectedTeacher.name} />

              <div className="self-info-container" style={{display:'flex',flexDirection:'column'}}>

              <div className="self-name-nation-container" style={{display:'flex',justifyContent: 'space-between'}}>
              <div className="self-nation" style={{display:'flex'}}>
               <img src={NationImg} alt={selectedTeacher.nation} />
                <h6 className="self-name">{selectedTeacher.name}</h6>
              </div>
              </div>
                <div className="self-category-container">        
                  <div className="self-category">{selectedTeacher.category}</div>
                </div>






      
             </div>

              </div> 

      <div className="introduntion-container">
        
       <div className="self-introduction">
      <div className="self-introduction-title" style={{display:'flex',justifyContent:'space-between'}}>
        <h6 className="self-inrtoduction-title">簡介</h6>
      </div>
      

      <p className="self-info-description" style={{fontSize:'14px',width:'60%'}}>{selectedTeacher.info}</p>
        </div>     
        
        </div>       
      
      
      <div className="teacherstyle-container">
        <div className="self-teaching-style">
      <div className="self-teaching-style-title-edit" style={{display:'flex',justifyContent:'space-between'}}>
        <h6 className="self-teaching-style-title">教學風格</h6>
      </div>
      
      <p className="self-teaching-style-description" style={{fontSize:'14px',width:'60%'}}>{selectedTeacher.teaching_style}</p>
    </div>
      </div>

      <div className="classtime-container">

      <div className="self-class-time">
      <div className="self-class-time-title-edit" style={{display:'flex',justifyContent:'space-between'}}>
        <h6 className="self-class-time-title">授課時間</h6>
      </div>
      

      <div className="self-class-time-calendar" style={{fontSize:'14px',width:'60%'}}>
        <MyCalendar />
      </div>
    </div>


      </div>


    </div>

    </div>

          )}
        </div>

        <div className="form-right col col-3" style={{display:'flex',flexDirection:'column'}}>
          {selectedTeacher && (
            <div>
              <div className="teacher-reserve" style={{ width: '70%' }}>
                <div>
                  <h3 className="teacher-reserve-title" style={{ backgroundColor: '#f3f3f3', textAlign: 'center', fontWeight: '600' }}>
                    預約上課
                  </h3>
                </div>
                <DatePicker selected={selectedDate} onChange={handleDateChange} filterDate={(date) => checkIfDateIsSelectable(date, selectedTeacher.courses[0].reserveDays)} 
                
                showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  timeCaption="Time"/>

                 <Select
                  options={categoryOptions}
                  onChange={(selectedOption) => setSelectedCategory(selectedOption)}
                  value={selectedCategory}
                  placeholder="選擇課程類別"
                />

                <Button className="btn-info" style={{ margin: '8% 0 0 2%' }} onClick={handleSubmit}>
                  預約
                </Button>
                <SuccessMessage show={showSuccessModal} handleClose={handleCloseSuccessModal} />
                <FailMessage show={showFailModal} handleClose={handleCloseFailModal} />

              </div>

              <div className="class-comments" style={{width:'80%'}}>
                <ClassComments teacher={selectedTeacher} />
              </div>
            </div>
          )}
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