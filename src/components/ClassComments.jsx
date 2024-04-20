//classcomment

import Rating from '../assets/images/svg/rating.svg'
import { Button,Card, CardImg } from "react-bootstrap";
import CommentModal from "../components/CommentsModal";
import { useState } from 'react';
import PropTypes from 'prop-types'



const ClassComments = ({teacherDetails}) =>{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const roundedRating = teacherDetails.ratingAverage?(parseFloat(teacherDetails.ratingAverage).toFixed(1)):(null);
const filteredCourses = teacherDetails.Courses.filter(course => {
  return course.Registrations.length>0 && course.Registrations.every(registration => registration.rating !== null);
});

 const courseLength = filteredCourses.length;

  const handleCommentClick = () => {

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return(

    <div className="self-comment">

      <div className="self-comment-title-rating" >
        <h6 className="self-comment-title">課程評價</h6>
        <img className="rating-img" src={Rating} alt="rating" />
        <h6 className="title">{roundedRating!==null?(roundedRating):('尚未有評價')}</h6>
        <h6 className="rating-count">{'('}{courseLength}{')'}</h6>
      </div>
      
        <div className="class-comment-info" >
          {teacherDetails.Courses.map((course,index)=>(
             course && course.Registrations && course.Registrations.length > 0 && course.Registrations[0].rating !== null &&(
               <Card key={index} className="class-comment-info-card">
            <Card.Body className="class-comment-info-card-body">
              <div className="card-container">
                <div className="card-img-title d-flex">
                  <div className='card-img'>
                <CardImg className="class-comment" src={course.image} alt={course.name} />

                  </div>

                <div className="card-title">
                  <Card.Title className="title">{course.name}</Card.Title>
                  <Card.Title className="date">{course.startAt}</Card.Title>
                </div>
                </div>



                <div className="card-rating">
                  <img className="rating" src={Rating} alt="rating" />
                  <h6 className="rating-num">{course.Registrations[0].rating}</h6>
                  
                </div>
              </div>

              <div className="card-description">
                <p className="class-comment-description">{course.Registrations[0].comment}</p>
              </div>
            </Card.Body>
          </Card>

            )
           
         

          )

          )}
      </div>        
         
         {roundedRating?(             
         <div className="card-link">
             <Button className="link" variant="outline-primary" onClick={handleCommentClick}>看更多評價</Button>     

          {isModalOpen && (
           <CommentModal show={isModalOpen} handleClose={closeModal} teacherDetails={teacherDetails}/>
         )}    
          </div>):(
            <>
            </>
          )}




    </div>

 

  )
};

ClassComments.propTypes = {
  teacherDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    nation: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    selfIntro: PropTypes.string.isRequired,
    teachStyle: PropTypes.string.isRequired,
    ratingAverage: PropTypes.string.isRequired,
    Courses: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        Registrations: PropTypes.shape({
          rating: PropTypes.number.isRequired,
          comment: PropTypes.string.isRequired,
        }).isRequired,
        category: PropTypes.shape({}).isRequired,
      })
    ).isRequired,
  }),
};




export default ClassComments;