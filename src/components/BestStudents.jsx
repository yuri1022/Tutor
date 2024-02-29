import { Card } from 'react-bootstrap';
import { useEffect } from 'react';
import '../assets/scss/studentsrank.scss'
import RankingImg from '../assets/images/svg/ranking.svg';
import Rank1 from '../assets/images/svg/rank1.svg';
import Rank2 from '../assets/images/svg/rank2.svg';
import Rank3 from '../assets/images/svg/rank3.svg';
import { useTeacherContext } from './teachercontext';


const BestStudents = () => {
  const { teacherData } = useTeacherContext();
  const bestStudent = teacherData.students || [];
  

  useEffect(() => {
    console.log(bestStudent);
    console.log({teacherData});
  }, [bestStudent]);

  return (
    
  <div className="container-ranking-list">

  <Card>
    <div className="ranking-list-title">
      <img className="card-rank-img" src={RankingImg} alt="" />
      <h3 className="card-title">學習時數總排行</h3>
    </div>

  
  {bestStudent.map((student,index) => (
          <div className="student-container" key={student.studentId} style={{ display: 'flex', alignItems: 'center',height:'3.5rem',paddingLeft:'1.125rem',paddingRight:'1.125rem',justifyContent:'space-between'}}>
        
        <div className="student-rank" style={{width:'2.625rem',textAlign:'center',marginRight:'1rem'}}> {index === 0 ? (
        <img src={Rank1} alt={`Rank ${index + 1}`} />
      ) : index === 1 ? (
        <img src={Rank2} alt={`Rank ${index + 1}`} />
      ) : index === 2 ? (
        <img src={Rank3} alt={`Rank ${index + 1}`} />
      ) : (
        index + 1
      )}            
          </div>

        <div className="student-info" style={{display:'flex',flex:'1'}}>

        <div className="img-container" style={{maxWidth:'3.5rem',maxHeight:'3.5rem',marginRight:'0.7rem'}}>
          <img src={student.User.avatar} alt={student.User.name} style={{width:'2rem',height:'2rem',borderRadius:'50%'}}/>
        </div>
        <div className="student-name" style={{padding:'2px',fontWeight:'700'}} >{student.User.name} </div>

        </div>

        <div className="student-time" style={{padding:'2px'}}>{student.studyHours}hr</div>
        
       
    </div>
        ))}
  </Card>

  </div>
  );
};

export default BestStudents;