import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DummyStudents } from './StudentsData';



const ImageContainer = styled.div`
  width: 100px;
  height: 100px; 
  margin: 5px; 
`;

const Image = styled.img`
  width: 100%; /* 图片宽度填充容器 */
  height: 100%; /* 图片高度填充容器 */
  object-fit: cover; /* 保持宽高比例并裁剪 */
`;

const Student = ({ student, rank }) =>{
  return(
    <div className="student-container" key={student.email} style={{ display: 'flex', alignItems: 'center',margin:'10px' }}>
        <ImageContainer>
        <Image src={student.avatar} alt={student.name} />
        </ImageContainer>
        <div className="student-rank" style={{padding:'2px'}}>No.{rank} </div>
        <div className="student-name" style={{padding:'2px'}} >{student.name} </div>
        <div className="student-time" style={{padding:'2px'}}>{student.total_lesson_time}小時</div>
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
    
  <div className="container ranking-list" style={{position:'absolute',top:'13%',maxWidth:'340px'}}>

  <Card>
  <h3 className="card-title" style={{textAlign:'center',marginTop:'20px'}}>學習時數總排行</h3>
  {sortedStudents.map((student, index) => (
          <Student key={student.email} student={student} rank={index + 1} />
        ))}
  </Card>

  </div>
  );
};

export default BestStudents;