import Navbar from "../components/Navbar";
import { Button,Card, CardImg } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NationImg from '../assets/images/svg/canada.svg';
import EditImg from '../assets/images/svg/edit.svg';
import Rating from '../assets/images/svg/rating.svg'
import '../assets/scss/teacherpage.scss'
import MyCalendar from "../components/Teacher_profile_Calendar";
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { DummyTeachers } from "../components/TeachersData";
import CommentModal from "../components/CommentsModal";
import { useState } from "react";





const TeacherSelfPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { teacher_id } = useParams();
  const teacher = DummyTeachers.find((t) => t.teacher_id === teacher_id);



  const navigate = useNavigate();

  const handleButtonClick = () => {
    // 在這裡執行導航
    navigate(`/self/edit`);
  };

  const handleCommentClick = () => {
    // 在這裡執行你的操作，例如拉取教師評價信息
    // ...

    // 打開 Modal
    setIsModalOpen(true);
  };

  const closeModal = () => {
    // 關閉 Modal
    setIsModalOpen(false);
  };


  return ( 
  <div>
    <Navbar />

  <div className="self-container col col-12" style={{marginTop:'6%',display:'flex'}}>

    <div className="self-left-basicinfo col col -9" style={{width:'100%'}}>

    <div className="self-card" style={{display:'flex'}}>

     <div className="self-card-container" >
      
      <img src={teacher.avatar} alt={teacher.name} />
      </div> 
    

    <div className="self-card-info-container">

      <div className="self-name-nation-container" style={{display:'flex',justifyContent: 'space-between',alignItems: 'center'}}>
      <div className="self-nation" style={{display:'flex'}}>
        <img src={NationImg} alt={teacher.nation} />
        <h6 className="self-name">{teacher.name}</h6>
      </div>

       <div className="self-edit" style={{display:'flex',flexDirection:'column',alignItems:'end'}}>
      <img src={EditImg} alt="edit" onClick={handleButtonClick}/>
      </div>

      </div>

      <div className="self-category-container">
        
      <div className="self-category">
      {teacher.category}
      </div>

    </div>

    </div>


    </div>

    <div className="self-introduction">
      <div className="self-introduction-title-edit" style={{display:'flex',justifyContent:'space-between'}}>
        <h6 className="self-inrtoduction-title">簡介</h6>
       <img src={EditImg} alt="edit" onClick={handleButtonClick}/>
      </div>
      

      <p className="self-info-description" style={{fontSize:'14px',width:'60%'}}>{teacher.info}</p>
    </div>


    <div className="self-teaching-style">
      <div className="self-teaching-style-title-edit" style={{display:'flex',justifyContent:'space-between'}}>
        <h6 className="self-teaching-style-title">教學風格</h6>
       <img src={EditImg} alt="edit" onClick={handleButtonClick}/>
      </div>
      
      <p className="self-teaching-style-description" style={{fontSize:'14px',width:'60%'}}>{teacher.teaching_style}</p>
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

    <div className="self-comment">

      <div className="self-comment-title-rating" style={{display:'flex'}}>
        <h6 className="self-comment-title">課程評價</h6>
        <img src={Rating} alt="rating" />
        <h6>{teacher.rating}</h6>
      </div>
      
    <div className="class-comment-title"><h5>New Schedule</h5></div>
        <div className="class-comment-info" style={{display:'flex',flexDirection:'column',width:'80%'}}>
          <Card className="class-comment-info-card" style={{fontSize:'16px',margin:'10px 10px 20px 0'}}>
            <Card.Body className="class-comment-info-card-body"> 
            <div className="card-container" style={{display:'flex'}}>

            <div className="card-img" style={{width:'60px',height:'40px'}}> 
            <CardImg className="class-comment" src={teacher.avatar} style={{borderRadius:'50%',width:'40px',height:'40px'}} />
            </div>


             <div className="card-title">
            <Card.Title>Office ipsum</Card.Title>
            <Card.Title>2024年02月04日</Card.Title>
            </div> 

            <div className="card-rating">
              <img src={Rating} alt="rating" />3.0
            
            </div>


            </div>
        
            <div className="card-description">

            <Card.Text className="class-comment-info">
              Office ipsum you must be muted. Keep fured tentative break land sorry baked productive growth. Mifflin incentivization put able hour timepoint hits. Important unlock activities on t-shaped back-end move wanted. Hop run based anyway mifflin call got.
              </Card.Text>


            </div>

            <div className="card-link">
            
            <Button onClick={handleCommentClick}>看更多評價</Button>

 

            </div>

          {isModalOpen && (
           <CommentModal show={isModalOpen} handleClose={closeModal} teacher={teacher}/>
         )}
            


            </Card.Body>
          </Card>
         
          
          </div>



    </div>

    </div>
 
  </div>

   </div>
  );
};


TeacherSelfPage.propTypes = {
  teacher: PropTypes.shape({
    name: PropTypes.string.isRequired,
    teacher_id: PropTypes.string.isRequired,
    nation: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    teaching_style:PropTypes.string.isRequired,
    rating:PropTypes.number.isRequired,
    category: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
};

export default TeacherSelfPage;