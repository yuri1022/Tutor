import Rating from '../assets/images/svg/rating.svg'
import { Button,Card, CardImg } from "react-bootstrap";
import CommentModal from "../components/CommentsModal";
import { useState } from 'react';
import PropTypes from 'prop-types'



const ClassComments = (props) =>{
  const [isModalOpen, setIsModalOpen] = useState(false);

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


  return(

    <div className="self-comment">

      <div className="self-comment-title-rating" style={{display:'flex'}}>
        <h6 className="self-comment-title">課程評價</h6>
        <img src={Rating} alt="rating" />
        <h6>{props.teacher.rating}</h6>
      </div>
      
        <div className="class-comment-info" style={{display:'flex',flexDirection:'column',width:'80%'}}>
          <Card className="class-comment-info-card" style={{fontSize:'16px',margin:'10px 10px 20px 0'}}>
            <Card.Body className="class-comment-info-card-body"> 
            <div className="card-container" style={{display:'flex'}}>

            <div className="card-img" style={{width:'60px',height:'40px'}}> 
            <CardImg className="class-comment" src={props.teacher.avatar} style={{borderRadius:'50%',width:'40px',height:'40px'}} />
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
           <CommentModal show={isModalOpen} handleClose={closeModal} teacher={props.teacher}/>
         )}
            


            </Card.Body>
          </Card>
         
          
          </div>



    </div>

 

  )
};

ClassComments.propTypes = {
  teacher: PropTypes.object.isRequired,
};




export default ClassComments;