import Rating from '../assets/images/svg/rating.svg'
import { Button,Card, CardImg } from "react-bootstrap";
import CommentModal from "../components/CommentsModal";
import { useState } from 'react';
import PropTypes from 'prop-types'



const ClassComments = ({teacherDetails}) =>{
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

      <div className="self-comment-title-rating" >
        <h6 className="self-comment-title">課程評價</h6>
        <img className="rating-img" src={Rating} alt="rating" />
        <h6 className="title">Rating</h6>
      </div>
      
        <div className="class-comment-info" >
          <Card className="class-comment-info-card">
            <Card.Body className="class-comment-info-card-body"> 
            <div className="card-container">

            <div className="card-img" > 
            <CardImg className="class-comment" src={teacherDetails.avatar} />
            </div>


             <div className="card-title">
            <Card.Title className="title">Office ipsum</Card.Title>
            <Card.Title className="date">2024年02月04日</Card.Title>
            </div> 

            <div className="card-rating">
              <img className="rating" src={Rating} alt="rating" />
              <h6 className='rating-num'>3.0</h6>
            
            </div>


            </div>
        
            <div className="card-description">
              <p className="class-comment-description">
              Office ipsum you must be muted. Keep fured tentative break land sorry baked productive growth. Mifflin incentivization put able hour timepoint hits. Important unlock activities on t-shaped back-end move wanted. Hop run based anyway mifflin call got.                
              </p>

            </div>

            </Card.Body>
          </Card>
          </div>
         
             <div className="card-link">
             <Button className="link" variant="outline-primary" onClick={handleCommentClick}>看更多評價</Button>     

          {isModalOpen && (
           <CommentModal show={isModalOpen} handleClose={closeModal} teacher={teacherDetails}/>
         )}    
          </div>



    </div>

 

  )
};

ClassComments.propTypes = {
   teacherDetails: PropTypes.shape({
   avatar: PropTypes.string.isRequired,
  }),
};




export default ClassComments;