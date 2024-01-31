const weekTime = Math.floor(Math.random(56) * 10 + 1) * 0.5;
const totalTime = weekTime * Math.floor(Math.random(30) * 10 + 1);
import PropTypes from 'prop-types';
import styled from "styled-components"
import '../main.scss'

const ImageContainer = styled.div`
  width: 250px;
  height: 250px; 
  margin-bottom: 10px; 
`;

const Image = styled.img`
  width: 100%; /* 图片宽度填充容器 */
  height: 100%; /* 图片高度填充容器 */
  object-fit: cover; /* 保持宽高比例并裁剪 */
`;

const DummyTeachers = [
  {
	name: 'user1',
  email: 'user1@example.com',
  password:'a1234567890',
  is_teacher: true,
  avatar: 'https://illustcenter.com/wp-content/uploads/2022/09/sdesign_00165-508x381.png',
  info: '热爱分享知识的教育者，致力于提供个性化学习体验。拥有丰富的教学经验，注重培养学生批判性思维和实际问题解决能力。',
  total_lesson_time: totalTime,
  week_lesson_time: weekTime,
  created_at: new Date(),
  updated_at: new Date()
},
  {
	name: 'user2',
  email: 'user2@example.com',
  password:'a1234567890',
  is_teacher: true,
  avatar: 'https://illustcenter.com/wp-content/uploads/2022/09/sdesign_00165-508x381.png',
  info: '热爱分享知识的教育者，致力于提供个性化学习体验。拥有丰富的教学经验，注重培养学生批判性思维和实际问题解决能力。',
  total_lesson_time: totalTime,
  week_lesson_time: weekTime,
  created_at: new Date(),
  updated_at: new Date()
},
  {
	name: 'user3',
  email: 'user3@example.com',
  password:'a1234567890',
  is_teacher: true,
  avatar: 'https://illustcenter.com/wp-content/uploads/2022/09/sdesign_00165-508x381.png',
  info: '热爱分享知识的教育者，致力于提供个性化学习体验。拥有丰富的教学经验，注重培养学生批判性思维和实际问题解决能力。',
  total_lesson_time: totalTime,
  week_lesson_time: weekTime,
  created_at: new Date(),
  updated_at: new Date()
},
  {
	name: 'user4',
  email: 'user4@example.com',
  password:'a1234567890',
  is_teacher: true,
  avatar: 'https://illustcenter.com/wp-content/uploads/2022/09/sdesign_00165-508x381.png',
  info: '热爱分享知识的教育者，致力于提供个性化学习体验。拥有丰富的教学经验，注重培养学生批判性思维和实际问题解决能力。',
  total_lesson_time: totalTime,
  week_lesson_time: weekTime,
  created_at: new Date(),
  updated_at: new Date()
},
  {
	name: 'user5',
  email: 'user5@example.com',
  password:'a1234567890',
  is_teacher: true,
  avatar: 'https://illustcenter.com/wp-content/uploads/2022/09/sdesign_00165-508x381.png',
  info: '热爱分享知识的教育者，致力于提供个性化学习体验。拥有丰富的教学经验，注重培养学生批判性思维和实际问题解决能力。',
  total_lesson_time: totalTime,
  week_lesson_time: weekTime,
  created_at: new Date(),
  updated_at: new Date()
},
  {
	name: 'user6',
  email: 'user6@example.com',
  password:'a1234567890',
  is_teacher: true,
  avatar: 'https://illustcenter.com/wp-content/uploads/2022/09/sdesign_00165-508x381.png',
  info: '热爱分享知识的教育者，致力于提供个性化学习体验。拥有丰富的教学经验，注重培养学生批判性思维和实际问题解决能力。',
  total_lesson_time: totalTime,
  week_lesson_time: weekTime,
  created_at: new Date(),
  updated_at: new Date()
}

];


const Teacher = ({ teacher }) => {
  return (
 
    <div className="div-container__info col col-4" key={teacher.email} style={{ maxWidth: '400px' , padding:'15px' }}>
     <h2>{teacher.name}</h2>
      <p>{teacher.info}</p>
        <ImageContainer>
        <Image src={teacher.avatar} alt={teacher.name} />
        </ImageContainer>
    </div>

  );
};

Teacher.propTypes = {
  teacher: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
  }).isRequired,
};


const TeacherCollection = () => {
  return (
  <div className="div-container col col-11" style={{ margin:'12% 0% 5% 7%'}}>
      {DummyTeachers.map((teacher) => (
        <Teacher key={teacher.email} teacher={teacher} />
      ))}
  </div>
  );
};

export default TeacherCollection;