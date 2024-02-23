import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import '../main.scss'
import { Card , Button } from 'react-bootstrap';
import  { DummyTeachers }  from './TeachersData';
import RatingStar from '../assets/images/svg/rating.svg';
import Nation from '../assets/images/svg/canada.svg';
import FirstPageArrow from '../assets/images/svg/arrow-first.svg';
import LastPageArrow from '../assets/images/svg/arrow-last.svg';
import PrePageArrow from '../assets/images/svg/previouspage.svg';
import NextPageArrow from '../assets/images/svg/nextpage.svg'
import '../assets/scss/homepage.scss';



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

        <div className="teacher-category-container" >
         <div className="teacher-category" >
  {teacher.category.map((category, index) => (
    <div className="teacher-item" key={index}>{category}</div>
  ))}
</div>

        </div>

       
        <div className="teacher-info">
          <p className="teacher-info-text" >{teacher.info}</p>
          </div>
        
     
   <div className="button-see-more" >
      
      <button className="btn-see-more btn btn-outline-light" onClick={handleButtonClick} >瀏覽更多</button>
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
    : DummyTeachers;


   const handlePreviousPage = () => {
    const newPage = currentPage > 1 ? currentPage - 1 : 1;
    handlePageChange(newPage);
  };

  const handleNextPage = () => {
    const newPage = currentPage < totalPages ? currentPage + 1 : totalPages;
    handlePageChange(newPage);
  };

  const handleFirstPage = () => {
    handlePageChange(1);
  };

  const handleLastPage = () => {
    handlePageChange(totalPages);
  };  

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
    
  <div className="div-container__home col col-11" >
  
        <div className="category-buttons">
          {/* 動態生成按鈕 */}
          {uniqueCategories.map((category) => (
            <Button
              className={`category-buttons-item ${category === selectedCategory || (category === '所有類別' && !selectedCategory) ? 'selected' : ''}`}
              key={category}
              variant="outline-light"
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>

      {filteredTeachersByCategory.map((teacher) => (
        <Teacher key={teacher.teacher_id} teacher={teacher} />
      ))}

      <div className="pagination">

        <div className="pagination-control">

        <div className="pagination-control-first">
          <img src={FirstPageArrow} alt="首頁" onClick={handleFirstPage}/>
        </div>
        <div className="pagination-control-prev">
          <img src={PrePageArrow} alt="上一頁" onClick={handlePreviousPage}/>
        </div>
        
        <div className="pagination-control-page">
          {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handlePageChange(index + 1)} 
            style={{border:'none'}}>
            {index + 1}
          </button>
        ))}

        </div>


        <div className="pagination-control-next">
          <img src={NextPageArrow} alt="下一頁" onClick={handleNextPage}/>
        </div>
        <div className="pagination-control-last">
          <img src={LastPageArrow} alt="末頁" onClick={handleLastPage}/>
        </div>
        
        
        

        </div>
        

      </div>

  </div>
  );
};

TeacherCollection.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};  

export default TeacherCollection;