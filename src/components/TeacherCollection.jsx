import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import '../main.scss'
import { Card , Button } from 'react-bootstrap';
import  { DummyTeachers }  from './TeachersData';
import RatingStar from '../assets/images/svg/rating.svg';
import Nation from '../assets/images/svg/canada.svg';
import '../assets/scss/homepage.scss'


const Teacher = ({ teacher }) => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    // 在這裡執行導航
    navigate(`/teacher/${teacher.teacher_id}`);
  };

  return (
    
      <div className="div-container__info col col-4" key={teacher.teacher_id}>
        <Card className="card">
        <Card.Body >
        <div className="teacher-top">
        <div className="teacher-img" style={{width: '7.5rem',height:'7.5rem'}}>
        <img src={teacher.avatar} alt={teacher.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
        </div>
        <div className="teacher-basic-info">

          
        <div className="teacher-title" >
          <div className="teacher-nation">
            <img className="teacher-nation-img" src={Nation} alt={teacher.nation} /></div>
        <h5 className="teacher-name" >{teacher.name}</h5>
        

        <div className="teacher-rating" >
          <img className="teacher-rating-img" src={RatingStar} alt={teacher.rating}/>
          <h6 className="teacher-rating-num">            
            {teacher.rating}</h6>
          </div>

      <div className="teacher-reserve-button">
      
      <button className="btn-reserve btn btn-outline-secondary" onClick={handleButtonClick}>預約課程</button>
    </div>
        
        </div>
        </div>
        </div>

        <div className="teacher-category-container" style={{minHeight:'2.6rem'}}>
         <div className="teacher-category" style={{ display: 'flex', justifyContent: 'left',flexWrap:'wrap',fontSize:'0.8rem',marginTop:'1.07rem',marginBottm:'0.54rem' }}>
  {teacher.category.map((category, index) => (
    <div key={index} style={{ padding:'0 0.268rem 0 0.268rem',margin: '0 0.268rem 0.268rem 0',backgroundColor: 'rgba(54, 82, 227, 0.25)' }}>{category}</div>
  ))}
</div>

        </div>

       
        <div className="teacher-info">
          <p className="card-text" style={{fontSize:'0.8rem'}}>{teacher.info}</p>
          </div>
        
     
   <div className="button-see-more" style={{ display:'flex',justifyContent: 'end' }}>
      
      <button className="btn-see-more btn btn-outline-secondary" onClick={handleButtonClick} style={{ margin:'10px',border:'none',fontSize:'0.8rem', textDecoration: 'underline dotted'}}>瀏覽更多</button>
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
    
  <div className="div-container__home col col-10" >
  
        <div className="category-buttons">
          {/* 動態生成按鈕 */}
          {uniqueCategories.map((category) => (
            <Button
              className="category-buttons-item"
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