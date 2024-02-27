import { useNavigate, useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import '../main.scss'
import { Card , Button } from 'react-bootstrap';
import RatingStar from '../assets/images/svg/rating.svg';
import Nation from '../assets/images/svg/canada.svg';
import FirstPageArrow from '../assets/images/svg/arrow-first.svg';
import LastPageArrow from '../assets/images/svg/arrow-last.svg';
import PrePageArrow from '../assets/images/svg/previouspage.svg';
import NextPageArrow from '../assets/images/svg/nextpage.svg'
import '../assets/scss/homepage.scss';
import { useTeacherContext } from './teachercontext';
import { TeacherItem } from './TeacherItem';
// import { getTeacher } from '../api/teacher.js'



// const Teacher = ({ teacher }) => {
//   const { id, name, avatar, nation, rating, selfIntro, Courses } = teacher;
//   const { selectedTeacherId, setTeacherId } = useTeacherContext();
//   const navigate = useNavigate();


//  const handleButtonClick = () => {
//     setTeacherId(id); // 設定選定的教師 ID
//     navigate(`/teacher/${id}`, { replace: true });
//   };

//   return (
    
//       <div className="div-container__info col col-4" key={id}>
//         <Card className="card">
//         <Card.Body >
//         <div className="teacher-top">
//         <div className="teacher-img" style={{width: '7.5rem',height:'7.5rem'}}>
//         <img src={teacher.avatar} alt={teacher.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
//         </div>
//         <div className="teacher-basic-info">

          
//         <div className="teacher-title" >
//           <div className="teacher-nation">
//             <img className="teacher-nation-img" src={Nation} alt={teacher.nation} /></div>
//         <h5 className="teacher-name" >{teacher.name}</h5>
        

//         <div className="teacher-rating" >
//           <img className="teacher-rating-img" src={RatingStar} alt={teacher.rating}/>
//           <h6 className="teacher-rating-num">            
//             {teacher.rating}</h6>
//           </div>

//       <div className="teacher-reserve-button">
      
//       <button className="btn-reserve btn btn-outline-secondary" onClick={handleButtonClick}>預約課程</button>
//     </div>
        
//         </div>
//         </div>
//         </div>

//         <div className="teacher-category-container" >
//          <div className="teacher-category" >
//       {teacher.Courses.map((course,index) => (
//       <div className="teacher-item" key={`${course.id}-${index}`}>
//           {course.Category.name}
//                 </div>
//               ))}
// </div>

//         </div>

       
//         <div className="teacher-info">
//           <p className="teacher-info-text" >{teacher.selfIntro}</p>
//           </div>
        
     
//    <div className="button-see-more" >
      
//       <button className="btn-see-more btn btn-outline-light" onClick={handleButtonClick} >瀏覽更多</button>
//     </div>
//      </Card.Body>
//    </Card>
//    </div>
   

//   );
// };

// Teacher.propTypes = {
//   teacher: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//     avatar: PropTypes.string.isRequired,
//     nation: PropTypes.string.isRequired,
//     rating: PropTypes.number.isRequired,
//     selfIntro: PropTypes.string.isRequired,
//     Courses: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         Category: PropTypes.shape({
//           name: PropTypes.string.isRequired,
//         }).isRequired,
//       })
//     ).isRequired,
//   }).isRequired,
// };


const TeacherCollection = ({searchTerm}) => {

const itemsPerPage = 6;
const { page } = useParams(); // 獲取路由參數中的 page
const currentPage = parseInt(page, 10) || 1;// 將 page 轉換為整數，默認為 1
const [teachers, setTeachers] = useState([]);
const [totalPages, setTotalPages] = useState(0);
const navigate = useNavigate();
 const { teacherData } = useTeacherContext();


  const handleButtonClick = () => {
    navigate(`/teacher/${teacherData.teachers.id}`, { replace: true });
  };

  //分頁功能

  const handlePageChange = (newPage) => {
    navigate(`/home/${newPage}`);
    window.scrollTo(0, 0);
  };

const allVisibleTeachers = teachers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const allFilteredTeachers = searchTerm
    ? teachers.filter((teacher) => teacher.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : teachers;



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

  const uniqueCategories = ['所有類別', ...new Set(teachers.flatMap((teacher) => teacher.category))];

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

      {/* {filteredTeachersByCategory.map((teacher) => (
        <TeacherItem key={teacher.id} teacher={teacher} />
      ))} */}

    {teacherData.teachers && teacherData.teachers.map((teacher) => (

      <div className="div-container__info col col-4" key={teacher.id}>
        <Card className="card">
        <Card.Body >
        <div className="teacher-top">
        <div className="teacher-img" style={{width: '7.5rem',height:'7.5rem'}}>
        <img src={teacher.avatar} alt={teacher.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
        </div>
        <div className="teacher-basic-info">

          
        <div className="teacher-title" >
          <div className="teacher-nation">
            <img className="teacher-nation-img" src={Nation} alt={teacherData.nation} /></div>
        <h5 className="teacher-name" >{teacher.name}</h5>
        

        <div className="teacher-rating" >
          <img className="teacher-rating-img" src={RatingStar} alt={teacherData.rating}/>
          <h6 className="teacher-rating-num">            
            {teacherData.rating}</h6>
          </div>

      <div className="teacher-reserve-button">
      
      <button className="btn-reserve btn btn-outline-secondary" onClick={handleButtonClick}>預約課程</button>
    </div>
        
        </div>
        </div>
        </div>

        <div className="teacher-category-container" >
         <div className="teacher-category" >
      {teacher.teaching_categories.map((category,index) => (
      <div className="teacher-item" key={`${category.categoryid}-${index}`}>
          {category.Category.name}
                </div>
              ))}
</div>

        </div>

       
        <div className="teacher-info">
          <p className="teacher-info-text" >{teacher.selfIntro}</p>
          </div>
        
     
   <div className="button-see-more" >
      
      <button className="btn-see-more btn btn-outline-light" onClick={handleButtonClick} >瀏覽更多</button>
    </div>
     </Card.Body>
   </Card>
   </div>
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