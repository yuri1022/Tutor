import Navbar from "../components/Navbar";
import { Button,Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import  { DummyTeachers }  from '../components/TeachersData';
import NationImg from '../assets/images/svg/canada.svg';
import EditImg from '../assets/images/svg/edit.svg';
import '../assets/scss/teacherpage.scss'
import MyCalendar from "../components/Teacher_profile_Calendar";



const TeacherSelfPage = () => {

  const navigate = useNavigate();
  const handleButtonClick = () => {
    // 在這裡執行導航
    navigate(`/self/edit`);
  };

  return (
  <div>
    <Navbar />

  <div className="self-container col col-12" style={{marginTop:'6%',display:'flex'}}>

    <div className="self-left-basicinfo col col -9" style={{width:'100%'}}>

    <div className="self-card" style={{display:'flex'}}>

     <div className="self-card-container" >
      
      <img src={DummyTeachers[0].avatar} alt={DummyTeachers[0].name} />
      </div> 
    

    <div className="self-card-info-container">

      <div className="self-name-nation-container" style={{display:'flex',justifyContent: 'space-between',alignItems: 'center'}}>
      <div className="self-nation" style={{display:'flex'}}>
        <img src={NationImg} alt={DummyTeachers[0].nation} />
        <h6 className="self-name">{DummyTeachers[0].name}</h6>
      </div>

       <div className="self-edit" style={{display:'flex',flexDirection:'column',alignItems:'end'}}>
      <img src={EditImg} alt="edit" onClick={handleButtonClick}/>
      </div>

      </div>

      <div className="self-category-container">
        
      <div className="self-category">
      {DummyTeachers[0].category}
      </div>

    </div>

    </div>


    </div>

    <div className="self-introduction">
      <div className="self-introduction-title-edit" style={{display:'flex',justifyContent:'space-between'}}>
        <h6 className="self-inrtoduction-title">簡介</h6>
       <img src={EditImg} alt="edit" onClick={handleButtonClick}/>
      </div>
      

      <p className="self-info-description" style={{fontSize:'14px',width:'60%'}}>{DummyTeachers[0].info}</p>
    </div>


    <div className="self-teaching-style">
      <div className="self-teaching-style-title-edit" style={{display:'flex',justifyContent:'space-between'}}>
        <h6 className="self-teaching-style-title">教學風格</h6>
       <img src={EditImg} alt="edit" onClick={handleButtonClick}/>
      </div>
      
      <p className="self-teaching-style-description" style={{fontSize:'14px',width:'60%'}}>{DummyTeachers[0].teaching_style}</p>
    </div>

        <div className="self-class-time">
      <div className="self-class-time-title-edit" style={{display:'flex',justifyContent:'space-between'}}>
        <h6 className="self-class-time-title">授課時間</h6>
       <img src={EditImg} alt="edit" onClick={handleButtonClick}/>
      </div>
      

      <div className="self-class-time-calendar" style={{fontSize:'14px',width:'60%'}}>
        <MyCalendar />
      </div>
    </div>


    </div>

    <div className="self-right col col -3" style={{width:'100%'}}>

    <div className="class-schedule"></div>
    <div className="class-schedule-title"><h5>New Schedule</h5></div>
        <div className="class-schedule-info" style={{display:'flex'}}>
          <Card className="class-schedule-info-card" style={{width: '40%',fontSize:'16px',margin:'10px 10px 20px 0'}}>
            <Card.Body className="class-schedule-info-card-body">
            <Card.Text className="class-schedule-info-card-time">Time</Card.Text>
            <Card.Text className="class-schedule-info-card-student">Students Name</Card.Text>
            <Card.Text className="class-schedule-info-card-link">Session Link</Card.Text>

            </Card.Body>
          </Card>

          <Card className="class-comment-card" style={{width: '40%',fontSize:'16px',margin:'10px 10px 20px 0'}}>
            <Card.Body className="body">
            <Card.Text className="class-schedule-info-card-time">Time</Card.Text>
            <Card.Text className="class-schedule-info-card-student">Students Name</Card.Text>
            <Card.Text className="class-schedule-info-card-link">Session Link</Card.Text>


            </Card.Body>
          </Card>
          
          </div>

    <div className="class-recent">

       <div className="teaching-style-title"><h5>Recent Reviewed</h5>
       <Card className="body" style={{width:'50%',margin:'10px 10px 20px 0'}}>
            <Card.Text className="class-schedule-info-card-time ">Message</Card.Text>
            </Card>
            </div>

    </div>
      <Button onClick={handleButtonClick}>看更多評價</Button>


    </div>

 

  </div>

   </div>
  );
};


export default TeacherSelfPage;