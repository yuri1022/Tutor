import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { DummyStudents } from './StudentsData';
import '../assets/scss/studentsrank.scss'
import RankingImg from '../assets/images/svg/ranking.svg';
import Rank1 from '../assets/images/svg/rank1.svg';
import Rank2 from '../assets/images/svg/rank2.svg';
import Rank3 from '../assets/images/svg/rank3.svg';



const Student = ({ student, rank }) =>{
  let icon;
  if (rank === 1) {
    icon = <img src={Rank1} alt={`Rank ${rank}`} />;
  } else if (rank === 2) {
    icon = <img src={Rank2} alt={`Rank ${rank}`} />;
  } else if (rank === 3) {
    icon = <img src={Rank3} alt={`Rank ${rank}`} />;
  } else {
    icon = rank; // 如果排名不是前三名，仍然顯示原始的排名數字
  }


  return(
    <div className="student-container" key={student.email} style={{ display: 'flex', alignItems: 'center',height:'3.5rem',paddingLeft:'1.125rem',paddingRight:'1.125rem',justifyContent:'space-between'}}>
        
        <div className="student-rank" style={{width:'2.625rem',textAlign:'center',marginRight:'1rem'}}>{icon}</div>

        <div className="student-info" style={{display:'flex',flex:'1'}}>

        <div className="img-container" style={{maxWidth:'3.5rem',maxHeight:'3.5rem',marginRight:'0.7rem'}}>
          <img src={student.avatar} alt={student.name} style={{maxWidth:'1.75rem',maxHeight:'1.75rem',borderRadius:'50%'}}/>
        </div>
        <div className="student-name" style={{padding:'2px',fontWeight:'700'}} >{student.name} </div>

        </div>

        <div className="student-time" style={{padding:'2px'}}>{student.total_lesson_time}hr</div>
        
       
    </div>
  );

};

Student.propTypes = {
  student: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,   
    avatar: PropTypes.string.isRequired,
    total_lesson_time:PropTypes.number.isRequired,
  }).isRequired,
    rank: PropTypes.number.isRequired,

};


const BestStudents = () => {

  const sortedStudents = DummyStudents.slice().sort((a, b) => b.total_lesson_time - a.total_lesson_time);

  return (
    
  <div className="container-ranking-list">

  <Card>
    <div className="ranking-list-title">
      <img className="card-rank-img" src={RankingImg} alt="" />
      <h3 className="card-title">學習時數總排行</h3>
    </div>

  
  {sortedStudents.map((student, index) => (
          <Student key={student.email} student={student} rank={index + 1} />
        ))}
  </Card>

  </div>
  );
};

export default BestStudents;