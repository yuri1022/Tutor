import { Modal , Card ,CardImg } from "react-bootstrap";
import PropTypes from 'prop-types';
import Rating from '../assets/images/svg/rating.svg';
import '../assets/scss/commentmodal.scss';
import { useState } from "react";


const CommentModal = ({show,handleClose,teacherDetails}) => {
const [selectedRatings, setSelectedRatings] = useState({
  5: true,
  4: true,
  3: true,
  2: true,
  1: true,
});

const handleRatingToggle = (rating) => {
  setSelectedRatings((prev) => ({
    ...prev,
    [rating]: !prev[rating],
  }));
};


    const ratingCounts = {
    5: 0, 
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

 teacherDetails.Courses.forEach((course) => {
    // 使用 filter 過濾掉 rating 或 comment 為 null 的 Registrations
    const validRegistrations = course.Registrations.filter(
      (registration) => registration.rating !== null && registration.comment !== null
    );

    // 接著處理過濾後的 validRegistrations
    validRegistrations.forEach((validRegistration) => {
      const rating = validRegistration.rating;
      ratingCounts[rating]++;
    });
  });

  const totalComments = Object.values(ratingCounts).reduce((total, count) => total + count, 0);

   const ratingPercentages = {};
  for (const key in ratingCounts) {
    if (Object.hasOwnProperty.call(ratingCounts, key)) {
      ratingPercentages[key] = (ratingCounts[key] / totalComments) * 100;
    }
  }

  const ratingKeys = Object.keys(ratingPercentages);
  console.log(ratingPercentages)

  return (
    <Modal size="xl" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      </Modal.Header>

      <Modal.Body>
        <div className="modal-container col col -12">

        <div className="modal-container-left col col -6" >

          <div className="modal-comment-counts">

            <div className="modal-comment-title">課程評價</div>
            {ratingKeys.map((key, index) => (
                <div className="modal-comment-count" key={index} style={{minWidth:'15rem'}}>
                  <div className="modal-comment-count-item" style={{ display: 'flex' }}>
                    <div className="toggle">
                      <input className="form-check-input" type="checkbox" value="" 
                      checked={selectedRatings[key]}
                      onChange={() => handleRatingToggle(key)}/>
                    </div>
                    <div className="title">
                      <span>{`${key}顆星`}</span>
                    </div>
                    <div className="percentimg" style={{ width: `${ratingPercentages[key]}%`,backgroundColor:'var(--main-blue)' }}>
                      <div className="progressbar"></div>
                    </div>
                    <div className="percent" style={{display:'flex',justifyContent:'end'}} >
                      <h6 >{`${ratingPercentages[key]}%`}</h6></div>
                  </div>
                </div>
              ))}

          </div>

          <div className="modal-category">

            <div className="modal-category-title">課程類別</div>
            <div className="modal-category-detail">
             {[...new Set(teacherDetails.Courses.map(course => course.category).flat())]
           .map((category, index) => (
        <span className="self-teacher-item" key={index}>{category}</span>
        
      ))}
            </div>
            
          </div>

        </div>

        
        <div className="modal-container-right col col -6">

          <div className="modal-comment-detail "> 
          {teacherDetails.Courses
          .filter((course) => selectedRatings[course.Registrations[0].rating])
          .map((course,index)=>(
            <Card key={index} className="class-comment-info-card">
            <Card.Body className="class-comment-info-card-body"> 
            <div className="card-container">

            <div className="card-img" > 
            <CardImg className="class-comment" src={course.image} />
            </div>


             <div className="card-title">
            <Card.Title className="card-title-name">{course.name}</Card.Title>
            <Card.Title className="card-title-startat">{course.startAt}</Card.Title>
            </div> 

            <div className="card-rating" style={{display:'flex'}}>
              <img className="rating" src={Rating} alt="rating" />
              <h6 className="rating-num">{course.Registrations[0].rating}</h6>
            </div>


            </div>
        
            <div className="card-description">

            <Card.Text className="class-comment-info">
            {course.Registrations[0].comment}

              </Card.Text>


            </div>

            </Card.Body>
          </Card>

          ))}
         
         


          </div>

        </div>



        </div>

        
      </Modal.Body>

      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

CommentModal.propTypes = {
  show: PropTypes.bool.isRequired,  
  handleClose: PropTypes.func.isRequired,
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

export default CommentModal;