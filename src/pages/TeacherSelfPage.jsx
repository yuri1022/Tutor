import Navbar from "../components/Navbar";
import { Button,Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import  { DummyTeachers }  from '../components/TeachersData'



const TeacherSelfPage = () => {

  const navigate = useNavigate();
  const handleButtonClick = () => {
    // 在這裡執行導航
    navigate(`/self/edit`);
  };

  return (
  <div><Navbar />
  <div className="self-container" style={{marginTop:'6%',display:'flex'}}>

      <div className="self-left-basicinfo" style={{width:'100%'}}>

    <div className="self-img">
      <img src={DummyTeachers[0].avatar} alt={DummyTeachers[0].name} />
    </div>


      <h3 className="self-name">{DummyTeachers[0].name}</h3>
      <h5 className="self-nation">{DummyTeachers[0].nation}</h5>
      <h5 className="self-rating">{DummyTeachers[0].rating}</h5>
      <h5 className="self-info">About Me</h5>
      <p className="self-info-description" style={{fontSize:'14px',width:'60%'}}>{DummyTeachers[0].info}</p>
    </div>

    <div className="self-right " style={{width:'100%'}}>

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

          <Card className="class-schedule-info-card" style={{width: '40%',fontSize:'16px',margin:'10px 10px 20px 0'}}>
            <Card.Body className="body">
            <Card.Text className="class-schedule-info-card-time">Time</Card.Text>
            <Card.Text className="class-schedule-info-card-student">Students Name</Card.Text>
            <Card.Text className="class-schedule-info-card-link">Session Link</Card.Text>


            </Card.Body>
          </Card>
          
          </div>


    <div className="teaching-style">
      <div className="teaching-style-title"><h5>Teaching Style</h5></div>
      
      <div className="teaching-style-info"><p>{DummyTeachers[0].teaching_style}</p></div>
      </div>
    <div className="class-recent">

       <div className="teaching-style-title"><h5>Recent Reviewed</h5>
       <Card className="body" style={{width:'50%',margin:'10px 10px 20px 0'}}>
            <Card.Text className="class-schedule-info-card-time ">Message</Card.Text>
            </Card>
            </div>

    </div>
      <Button onClick={handleButtonClick}>編輯個人資料</Button>


    </div>

 

  </div>

   </div>
  );
};


export default TeacherSelfPage;