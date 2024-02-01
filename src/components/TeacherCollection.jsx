
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from "styled-components"
import '../main.scss'
import { Card } from 'react-bootstrap';
import  { DummyTeachers }  from './TeachersData'

const ImageContainer = styled.div`
  width: 160px;
  height: 160px; 
  margin-bottom: 10px; 
`;

const Image = styled.img`
  width: 100%; 
  height: 100%; 
  object-fit: cover; 
`;

const Teacher = ({ teacher }) => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    // 在這裡執行導航
    navigate(`/user/${teacher.id}`);
  };

  return (
    
      <div className="div-container__info col col-4" key={teacher.id} style={{ maxWidth: '400px' , padding:'15px' }}>
        <Card className="card" style={{width: '100%'}}>
        <Card.Body >
        <div className="teacher-top" style={{ display: 'flex', alignItems: 'center' }}>
        <ImageContainer>
        <Image src={teacher.avatar} alt={teacher.name} />
        </ImageContainer>
        <div className="teacher-title" style={{ display: 'flex', flexDirection: 'column',alignItems: 'center' ,position:'absolute',top:'10%',left:'55%'}}>
        <h3 className="card-title">{teacher.name}</h3>
        <h5 className="card-title">{teacher.nation}</h5>
        </div>
        </div>
        <p className="card-text">{teacher.info}</p>
     
   <div className="button" style={{ display:'flex',justifyContent: 'center' }}>
      
      <button className="btn btn-outline-secondary" onClick={handleButtonClick} style={{ margin:'10px' }}>詳細資訊</button>
       <button href="#" className="btn btn-outline-secondary" style={{ margin:'10px' }}>我要預約</button>
    </div>
     </Card.Body>
   </Card>
   </div>
   

  );
};

Teacher.propTypes = {
  teacher: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    nation: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
  }).isRequired,
};


const TeacherCollection = () => {

  return (
  <div className="div-container col col-11" style={{ margin:'14% 0% 5% 7%'}}>
      {DummyTeachers.map((teacher) => (
        <Teacher key={teacher.id} teacher={teacher} />
      ))}

  </div>
  );
};

export default TeacherCollection;