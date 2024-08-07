import { Modal , Card ,CardImg } from "react-bootstrap";
import PropTypes from 'prop-types';
import Rating from '../../assets/images/svg/rating.svg';
import { useState } from "react";
import defaultImg from '../../assets/images/svg/defaultimg.svg'

const CommentModal = ({show,handleClose,teacherDetails}) => {
const [selectedRatings, setSelectedRatings] = useState({
  5: true,
  4: true,
  3: true,
  2: true,
  1: true,
});

const [selectedCategory, setSelectedCategory] = useState("allCategories");

console.log(selectedCategory)

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
    const validRegistrations = course.Registrations.filter(
      (registration) => registration.rating !== null && registration.comment !== null
    );

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

    const handleCategoryToggle = (category) => {
    if (category === "allCategories") {
      setSelectedCategory(["allCategories"]);
    } else {
      setSelectedCategory((prev) => {
        const index = prev.indexOf(category);
        if (index !== -1) {
          return prev.filter((c) => c !== category);
        } else {
          return [...prev, category];
        }
      });
    }
  };

  return (
    <Modal className="comment-modal" size="lg" show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
      </Modal.Header>

      <Modal.Body>
        <div className="modal-container col-12">

        <div className="modal-container-left col-12 col-md-5 col-lg-5" >

          <div className="modal-comment-counts">

            <div className="modal-comment-title">課程評價</div>
            {ratingKeys.map((key, index) => (
                <div className="modal-comment-count" key={index} >
                  <div className="modal-comment-count-item" style={{ display: 'flex', width:'80%' }}>
                    <div className="toggle">
                      <input className="form-check-input" type="checkbox" value="" 
                      checked={selectedRatings[key]}
                      onChange={() => handleRatingToggle(key)}/>
                    </div>
                    <div className="title" style={{minWidth:'3rem'}}>
                      <span>{`${key}顆星`}</span>
                    </div>
                  {/* 已經評分的部分，藍色 */}
                  <div>

                  </div>
                <div className="percentimg" style={{ width: `${ratingPercentages[key]}%`,backgroundColor: 'var(--main-blue)' }}>
                <div className="progressbar"></div>
                 </div>
                {/* 未評分的部分，灰色 */}
               <div className="percentimg" style={{ width: `${100 - ratingPercentages[key]}%`,backgroundColor: '#D9D9D9' }}>
                <div className="progressbar" ></div>
                </div>
              <div className="percentnum" style={{ display: 'flex', justifyContent: 'end' ,minWidth:'3rem'}}>
              <h6 className="percent-num-item">{`${ratingPercentages[key].toFixed(2)}%`}</h6>
                </div>
             </div>
                </div>
              ))}

          </div>

          <div className="modal-category">

            <div className="modal-category-title">課程類別</div>
       <div className="modal-category-detail">
          <span
            className={`modal-category-item ${selectedCategory.includes("allCategories") ? "selected" : ""}`}
            onClick={() => handleCategoryToggle("allCategories")}
          >
            所有類別
          </span>

          {[...new Set(teacherDetails.Courses.map((course) => course.category).flat())].map((category, index) => (
            <span
              key={index}
              className={`modal-category-item ${selectedCategory.includes(category) ? "selected" : ""}`}
              onClick={() => handleCategoryToggle(category)}
            >
              {category}
            </span>
          ))}
        </div>
            
          </div>

        </div>

        
        <div className="modal-container-right col-12 col-md-7 col-lg-7">

          <div className="modal-comment-detail"> 
          {teacherDetails.Courses
          .filter(
            (course) =>
            (selectedCategory === "allCategories" || selectedCategory === course.category ) && 
            selectedRatings[course.Registrations[0]?.rating]
            )
          .map((course,index)=>(
             course.Registrations[0].rating !== null && course.Registrations[0].comment !== null && (
            <Card key={index} className="class-comment-info-card">
            <Card.Body className="class-comment-info-card-body"> 
            <div className="card-container">

              <div className="card-img-title">
                 <div className="card-img" > 
            <CardImg className="class-comment" src={course.image.length>0 ?course.image : defaultImg}/>
            </div>


             <div className="card-title">
            <Card.Title className="card-title-name">{course.name}</Card.Title>
            <Card.Title className="card-title-startat">{course.startAt}</Card.Title>
            </div> 
              </div>
         

            <div className="card-rating" >

              <img className="rating" src={Rating} alt="rating" />
              <h6 className="rating-num">{course.Registrations[0].rating.toFixed(1)}</h6>
            </div>


            </div>
        
            <div className="card-description">
            <Card.Text className="class-comment-info">
            {course.Registrations[0].comment}

              </Card.Text>


            </div>

            </Card.Body>
          </Card>
             )
            

          ))}
         
         


          </div>

        </div>



        </div>

        
      </Modal.Body>

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
    teaching_categories: PropTypes.arrayOf(PropTypes.shape({
      categoryId: PropTypes.number.isRequired,
      Category: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })).isRequired,

    Courses: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      duration:PropTypes.number.isRequired,
      category: PropTypes.shape({
      }).isRequired,
      Registrations: PropTypes.shape({
        rating:PropTypes.number.isRequired,
        comment:PropTypes.string.isRequired,
      }).isRequired,
    })).isRequired,
  }),
};

export default CommentModal;