import { useNavigate, useParams } from 'react-router-dom';
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
    navigate(`/teacher/${teacher.teacher_id}`);
  };

  return (
    
      <div className="div-container__info col col-4" key={teacher.teacher_id} style={{ maxWidth: '400px' , padding:'15px' }}>
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
    </div>
     </Card.Body>
   </Card>
   </div>
   

  );
};

Teacher.propTypes = {
  teacher: PropTypes.shape({
    name: PropTypes.string.isRequired,
    teacher_id: PropTypes.string.isRequired,
    nation: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
  }).isRequired,
};


const TeacherCollection = () => {

const itemsPerPage = 6;
const { page } = useParams(); // 獲取路由參數中的 page

const currentPage = parseInt(page, 10) || 1; // 將 page 轉換為整數，默認為 1

  const totalTeachers = DummyTeachers.length;
  const totalPages = Math.ceil(totalTeachers / itemsPerPage);

  const navigate = useNavigate();

  const handlePageChange = (newPage) => {
    navigate(`/home/${newPage}`);
    window.scrollTo(0, 0);
  };

  const visibleTeachers = DummyTeachers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
  <div className="div-container col col-11" style={{ margin:'14% 0% 5% 7%'}}>
      {visibleTeachers.map((teacher) => (
        <Teacher key={teacher.teacher_id} teacher={teacher} />
      ))}

      <div className="pagination" style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'5%'}}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handlePageChange(index + 1)} >
            {index + 1}
          </button>
        ))}
      </div>

  </div>
  );
};

export default TeacherCollection;