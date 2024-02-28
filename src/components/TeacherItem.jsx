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