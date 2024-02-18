  import Navbar from '../components/Navbar';
  import  { DummyTeachers }  from '../components/TeachersData'
  import { useParams } from 'react-router-dom';
  import styled from 'styled-components';
  import { Button } from 'react-bootstrap';
  import SuccessMessage from '../components/successmodal';
  import { useState } from 'react';
  import DatePicker from 'react-datepicker'
  import 'react-datepicker/dist/react-datepicker.css';


  const ImageContainer = styled.div`
    width: 360px;
    height: 360px; 
  `;

  const Image = styled.img`
    width: 100%; 
    height: 100%; 
    object-fit: cover; 
  `;

  const TeachersPage = () => {
    const { teacher_id } = useParams();
    const selectedTeacher = DummyTeachers.find(teacher => teacher.teacher_id === String(teacher_id));
    const [selectedDate, setSelectedDate] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // 新增這一行


    const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);

  };

    const handleSubmit = () => {
      // 在這裡使用表單資料，例如將資料存儲到 TeacherData 中
      const formData = {
        selectedDate,
        // 其他表單資料...
      };
      console.log('Submit:', formData);
      // 這裡可以進一步將資料送到伺服器，或進行其他適當的處理
      // 接下來你可以導航到預約成功的頁面，例如使用 React Router 的 useHistory 鉤子
      setShowSuccessModal(true);
    };

      const handleCloseSuccessModal = () => {
      // 關閉 SuccessModal 的回調函式
      setShowSuccessModal(false);
    };

  const checkIfDateIsSelectable = (date, reserveDays) => {
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const selectedDayOfWeek = daysOfWeek[date.getDay()];

  return reserveDays[selectedDayOfWeek];
};


  let dateLogCounter = 0;

  const handleDateChange = (date) => {
    // 檢查選擇的日期是否在預約日內
    // 這裡需要根據每個老師的 courses 信息來檢查
    // 假設 selectedTeacher 是當前老師對象，包含 courses
    console.log('Selected Date:', date); // 確保 date 正確

    if (selectedTeacher && selectedTeacher.courses) {
      let isSelectable = false;

      for (const course of selectedTeacher.courses) {
        if (course.reserveDays) {
          const isCourseSelectable = checkIfDateIsSelectable(date, course.reserveDays);

          // 限制輸出次數，例如只輸出前 10 次
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

    return (
    <div>
      <Navbar searchTerm={searchTerm} onSearchChange={handleSearchChange}/>
        <div className="div-container col col-11" style={{ margin:'5% 0% 3% 7%'}}>
        {selectedTeacher && (
            <div key={selectedTeacher.id} style={{display:'flex'}}>

              <div className="teacher-img">

              <ImageContainer>
                <Image src={selectedTeacher.avatar} alt={selectedTeacher.name} />
              </ImageContainer>

              </div>

              
              <div className="teacher-summary" style={{ maxWidth:'600px',margin:'10% 0% 0% 10%'}}>
              <h1 className='teacher-summary-name' style={{fontWeight:'700',fontSize:'30px'}}>{selectedTeacher.name}</h1>
              <h4 className='teacher-summary-nation' style={{marginTop:'40%'}}>{selectedTeacher.nation}</h4>
              <h3 className='teacher-summary-rating'>
              {selectedTeacher.courses.map((course) => (
              <div key={course.class_id}>
              Rating:{course.total_score}
              </div>
                    ))}
              </h3>

              </div>


            <div className="teacher-info-style">

          
              <div className="teacher-info" style={{maxWidth:'600px',position:'absolute',top:'65%',left:'10%',padding:'2% 0 5% 0'}}>
                <h4 className="teacher-info-title">Introduction</h4>
                <p className="teacher-info-detail"> {selectedTeacher.info}</p>
              </div>

              <div className="teacher-style" style={{position:'absolute',top:'75%',left:'10%',padding:'5% 0 5% 0'}}>
                <h4 className="teacher-style-title">Teaching Style</h4>
                <p className="teacher-style-detail">{selectedTeacher.teaching_style}</p>
              </div>

              
              <div className="teacher-lesson" style={{position:'absolute',top:'85%',left:'10%',padding:'6% 0 5% 0'}}>
                <h4 className="teacher-style-title">Lesson History</h4>
                <p className="teacher-style-detail">{selectedTeacher.teaching_style}</p>
              </div>

            </div>
              
            

              <div className="teacher-reserve" style={{margin:'5% 0 0 40%',width:'100%'}}>
                <div>
                  <h3 className="teacher-reserve-title" style={{backgroundColor:'#f3f3f3',textAlign:'center',fontWeight:'600'}}>預約上課</h3>
                  </div>
          
                  {/* Date Picker */}
                 <DatePicker selected={selectedDate} onChange={handleDateChange}
                 filterDate={(date) => checkIfDateIsSelectable(date, selectedTeacher.courses[0].reserveDays)} />


                <Button className='btn-info' style={{ margin: '8% 0 0 67%' }} onClick={handleSubmit}>預約</Button>

                <SuccessMessage show={showSuccessModal} handleClose={handleCloseSuccessModal} />


              </div>
        
            </div>
          )}
        </div>

    </div>
    );
  };

  export default TeachersPage;