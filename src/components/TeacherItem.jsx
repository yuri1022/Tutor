import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../main.scss'
import { Card } from 'react-bootstrap';
import RatingStar from '../assets/images/svg/rating.svg';
import Nation from '../assets/images/svg/canada.svg';
import '../assets/scss/homepage.scss';
import { useTeacherContext } from './teachercontext';
// import { getTeacher } from '../api/teacher.js'


export const TeacherItem = () => {

const navigate = useNavigate(); 
const { teacherData } = useTeacherContext();


  const handleButtonClick = () => {
    navigate(`/teacher/${teacherData.id}`, { replace: true });
  };

  return (
    
      <div className="div-container__info col col-4" key={id}>
        <Card className="card">
        <Card.Body >
        <div className="teacher-top">
        <div className="teacher-img" style={{width: '7.5rem',height:'7.5rem'}}>
        <img src={teacherData.avatar} alt={teacherData.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
        </div>
        <div className="teacher-basic-info">

          
        <div className="teacher-title" >
          <div className="teacher-nation">
            <img className="teacher-nation-img" src={Nation} alt={teacherData.nation} /></div>
        <h5 className="teacher-name" >{teacherData.name}</h5>
        

        <div className="teacher-rating" >
          <img className="teacher-rating-img" src={RatingStar} alt={teacherData.rating}/>
          <h6 className="teacher-rating-num">            
            {teacherData.rating}</h6>
          </div>

      <div className="teacher-reserve-button">
      
      <button className="btn-reserve btn btn-outline-secondary" onClick={handleButtonClick}>預約課程</button>
    </div>
        
        </div>
        </div>
        </div>

        <div className="teacher-category-container" >
         <div className="teacher-category" >
      {teacherData.teaching_categories.map((category,index) => (
      <div className="teacher-item" key={`${category.categoryid}-${index}`}>
          {category.Category.name}
                </div>
              ))}
</div>

        </div>

       
        <div className="teacher-info">
          <p className="teacher-info-text" >{teacherData.selfIntro}</p>
          </div>
        
     
   <div className="button-see-more" >
      
      <button className="btn-see-more btn btn-outline-light" onClick={handleButtonClick} >瀏覽更多</button>
    </div>
     </Card.Body>
   </Card>
   </div>
   

  );
};

TeacherItem.propTypes = {
  teacherData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    nation: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    selfIntro: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    teaching_categories: PropTypes.arrayOf(
      PropTypes.shape({
        categoryid: PropTypes.number.isRequired,
        Category: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
};