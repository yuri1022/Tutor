import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components"
import '../main.scss'
import { Card , Button } from 'react-bootstrap';
import  { DummyTeachers }  from './TeachersData';
import RatingStar from '../assets/images/svg/rating.svg';
import Nation from '../assets/images/svg/canada.svg';

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
    
      <div className="div-container__info col col-4" key={teacher.teacher_id} style={{ width: '313px',height:'320px' , margin:'auto 0 30px 0px' }}>
        <Card className="card" style={{width: '100%'}}>
        <Card.Body >
        <div className="teacher-top" style={{ display: 'flex', alignItems: 'center' }}>
        <ImageContainer>
        <Image src={teacher.avatar} alt={teacher.name} />
        </ImageContainer>
        <div className="teacher-title" style={{ display: 'flex', flexDirection: 'column' ,position:'absolute',top:'5%',left:'55%'}}>
          <div className="teacher-nation">
            <img src={Nation} alt={teacher.nation} style={{width:'26.67px',height:'20px'}}/></div>
        <h5 className="card-title" style={{fontWeight:'800',marginTop:'3%'}}>{teacher.name}</h5>
        

        <div className="teacher-rating" style={{display:'flex',marginTop:'15%'}}>
          <img src={RatingStar} alt={teacher.rating} style={{width:'18px',height:'18px'}}/>
          <h6 className="teacher-rating" style={{position:'absolute',left:'23px',textAlign:'end'}}>            
            {teacher.rating}</h6>
          </div>

      <div className="teacher-reserve-button" style={{ display:'flex',justifyContent: 'center' }}>
      
      <button className="btn btn-outline-secondary" onClick={handleButtonClick} style={{ margin:'10px' }}>預約課程</button>
    </div>
        
        </div>
        </div>
        <div className="teacher-category" style={{ display: 'flex', justifyContent: 'left' }}>
  {teacher.category.map((category, index) => (
    <div key={index} style={{ marginRight: '5px',backgroundColor: 'rgba(54, 82, 227, 0.25)' }}>{category}</div>
  ))}
</div>
        <div className="teacher-info">
          <p className="card-text">{teacher.info}</p>
          </div>
        
     
   <div className="button" style={{ display:'flex',justifyContent: 'center' }}>
      
      <button className="btn btn-outline-secondary" onClick={handleButtonClick} style={{ margin:'10px' }}>瀏覽更多</button>
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
    rating:PropTypes.number.isRequired,
    category: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
};


const TeacherCollection = ({searchTerm}) => {

const itemsPerPage = 6;
const { page } = useParams(); // 獲取路由參數中的 page

const currentPage = parseInt(page, 10) || 1; // 將 page 轉換為整數，默認為 1

  const totalTeachers = DummyTeachers.length;
  const totalPages = Math.ceil(totalTeachers / itemsPerPage);

  const navigate = useNavigate();

  //分頁功能

  const handlePageChange = (newPage) => {
    navigate(`/home/${newPage}`);
    window.scrollTo(0, 0);
  };

 const allVisibleTeachers = DummyTeachers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const allFilteredTeachers = searchTerm
    ? DummyTeachers.filter((teacher) => teacher.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : allVisibleTeachers;

  // 選擇類別
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const uniqueCategories = ['所有類別', ...new Set(DummyTeachers.flatMap((teacher) => teacher.category))];

  // 類別篩選器的 change 事件處理函數
  const filteredTeachersByCategory = selectedCategory
    ? (selectedCategory === '所有類別'
      ? allVisibleTeachers
      : allFilteredTeachers.filter((teacher) => teacher.category.includes(selectedCategory)))
    : allVisibleTeachers;

  return (
    
  <div className="div-container col col-11" style={{ margin:'2% 0% 5% 2%'}}>
  
        <div className="category-buttons" style={{width:'100%'}}>
          {/* 動態生成按鈕 */}
          {uniqueCategories.map((category) => (
            <Button
              key={category}
              variant="outline-primary"
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>

      {filteredTeachersByCategory.map((teacher) => (
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

TeacherCollection.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};  

export default TeacherCollection;