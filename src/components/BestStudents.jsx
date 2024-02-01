import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DummyStudents = [
  {
	name: '1Charlee',
  email: 'user1@example.com',
  password:'a1234567890',
  nation:'taiwan',
  is_teacher: true,
  avatar: 'https://png.pngtree.com/png-vector/20221222/ourmid/pngtree-super-cute-cartoon-vector-bear-png-image_6504049.png',
  info: '热爱分享知识的教育者，致力于提供个性化学习体验。拥有丰富的教学经验，注重培养学生批判性思维和实际问题解决能力。',
  total_lesson_time: Math.floor(Math.random(56) * 10 + 1) * 0.5,
  week_lesson_time: Math.floor(Math.random(56) * 10 + 1) * 0.5,
  created_at: new Date(),
  updated_at: new Date()
},
  {
	name: '2mei',
  email: 'user2@example.com',
  password:'a1234567890',
  nation:'taiwan',
  is_teacher: true,
  avatar: 'https://png.pngtree.com/png-vector/20221222/ourmid/pngtree-super-cute-cartoon-vector-bear-png-image_6504049.png',
  info: '热爱分享知识的教育者，致力于提供个性化学习体验。拥有丰富的教学经验，注重培养学生批判性思维和实际问题解决能力。',
  total_lesson_time: Math.floor(Math.random(56) * 10 + 1) * 0.5,
  week_lesson_time:Math.floor(Math.random(56) * 10 + 1) * 0.5,
  created_at: new Date(),
  updated_at: new Date()
},
  {
	name: '3Elly',
  email: 'user3@example.com',
  password:'a1234567890',
  nation:'taiwan',
  is_teacher: true,
  avatar: 'https://png.pngtree.com/png-vector/20221222/ourmid/pngtree-super-cute-cartoon-vector-bear-png-image_6504049.png',
  info: '热爱分享知识的教育者，致力于提供个性化学习体验。拥有丰富的教学经验，注重培养学生批判性思维和实际问题解决能力。',
  total_lesson_time: Math.floor(Math.random(56) * 10 + 1) * 0.5,
  week_lesson_time: Math.floor(Math.random(56) * 10 + 1) * 0.5,
  created_at: new Date(),
  updated_at: new Date()
},
  {
	name: '4Azhi',
  email: 'user4@example.com',
  password:'a1234567890',
  nation:'taiwan',
  is_teacher: true,
  avatar: 'https://png.pngtree.com/png-vector/20221222/ourmid/pngtree-super-cute-cartoon-vector-bear-png-image_6504049.png',
  info: '热爱分享知识的教育者，致力于提供个性化学习体验。拥有丰富的教学经验，注重培养学生批判性思维和实际问题解决能力。',
  total_lesson_time: Math.floor(Math.random(56) * 10 + 1) * 0.5,
  week_lesson_time: Math.floor(Math.random(56) * 10 + 1) * 0.5,
  created_at: new Date(),
  updated_at: new Date()
},
  {
	name: '5wayne',
  email: 'user5@example.com',
  password:'a1234567890',
  nation:'taiwan',
  is_teacher: true,
  avatar: 'https://png.pngtree.com/png-vector/20221222/ourmid/pngtree-super-cute-cartoon-vector-bear-png-image_6504049.png',
  info: '热爱分享知识的教育者，致力于提供个性化学习体验。拥有丰富的教学经验，注重培养学生批判性思维和实际问题解决能力。',
  total_lesson_time: Math.floor(Math.random(56) * 10 + 1) * 0.5,
  week_lesson_time: Math.floor(Math.random(56) * 10 + 1) * 0.5,
  created_at: new Date(),
  updated_at: new Date()
},
  {
	name: '6ashe',
  email: 'user6@example.com',
  password:'a1234567890',
  nation:'taiwan',
  is_teacher: true,
  avatar: 'https://png.pngtree.com/png-vector/20221222/ourmid/pngtree-super-cute-cartoon-vector-bear-png-image_6504049.png',
  info: '热爱分享知识的教育者，致力于提供个性化学习体验。拥有丰富的教学经验，注重培养学生批判性思维和实际问题解决能力。',
  total_lesson_time: Math.floor(Math.random(56) * 10 + 1) * 0.5,
  week_lesson_time: Math.floor(Math.random(56) * 10 + 1) * 0.5,
  created_at: new Date(),
  updated_at: new Date()
}

];


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