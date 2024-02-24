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
import { getTeacher } from '../api/teacher.js'



const Teacher = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacherDetails, setTeacherDetails] = useState(null);

  useEffect(() => {
    // 使用API來獲取教師詳細資訊
    const fetchTeacherDetails = async (id) => {
      try {
      const teachersData = await getTeacher(id); // 根據 id 獲取教師
      console.log('Teachers Data:', teachersData);

      const teacher = teachersData.find((teacher) => teacher.id === Number(id)); 
      console.log(teachersData.data)
        setTeacherDetails(teacher);
        return teachersData;
      } catch (error) {
        console.error('Failed to fetch teacher details:', error);
      }
    };

    fetchTeacherDetails(id);
  }, [id]);


  const handleButtonClick = () => {
    // 在這裡執行導航
    navigate(`/teacher/${id}`, { replace: true });
  };

  if (!teacherDetails) {
    // 如果教师详细信息还未获取到，可以显示加载状态或其他内容
    return <div>Loading...</div>;
  }


  return (
    
      <div className="div-container__info col col-4" key={id}>
        <Card className="card">
        <Card.Body >
        <div className="teacher-top">
        <div className="teacher-img" style={{width: '7.5rem',height:'7.5rem'}}>
        <img src={teacherDetails.avatar} alt={teacherDetails.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
        </div>
        <div className="teacher-basic-info">

          
        <div className="teacher-title" >
          <div className="teacher-nation">
            <img className="teacher-nation-img" src={Nation} alt={teacherDetails.nation} /></div>
        <h5 className="teacher-name" >{teacherDetails.name}</h5>
        

        <div className="teacher-rating" >
          <img className="teacher-rating-img" src={RatingStar} alt={teacherDetails.rating}/>
          <h6 className="teacher-rating-num">            
            {teacherDetails.rating}</h6>
          </div>

      <div className="teacher-reserve-button">
      
      <button className="btn-reserve btn btn-outline-secondary" onClick={handleButtonClick}>預約課程</button>
    </div>
        
        </div>
        </div>
        </div>

        <div className="teacher-category-container" >
         <div className="teacher-category" >
      {teacherDetails.Courses.map((course,index) => (
      <div className="teacher-item" key={`${course.id}-${index}`}>
          {course.Category.name}
                </div>
              ))}
</div>

        </div>

       
        <div className="teacher-info">
          <p className="teacher-info-text" >{teacherDetails.selfIntro}</p>
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
    id: PropTypes.number.isRequired,
    nation: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    selfIntro: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    Courses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        Category: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
};


const TeacherCollection = ({searchTerm,id}) => {

const itemsPerPage = 6;
const { page } = useParams(); // 獲取路由參數中的 page
const currentPage = parseInt(page, 10) || 1;// 將 page 轉換為整數，默認為 1
 const [teachers, setTeachers] = useState([]);
const [totalPages, setTotalPages] = useState(0);
const navigate = useNavigate();


  useEffect(() => {
    const fetchTeachers = async () => {
    try {
      const teachersData = await getTeacher();
      setTeachers(teachersData.data);
      setTotalPages(Math.ceil(teachersData.data.length / itemsPerPage));
    } catch (error) {
      console.error('Failed to fetch teachers:', error);
    }
  };
  // 检查 id 是否存在
  if (id) {
    fetchTeachers(id);
  }
  else{
    console.log('can not read id')
  }
}, [id]);

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

      {filteredTeachersByCategory.map((teacher) => (
        <Teacher key={teacher.id} teacher={teacher} />
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
  id:PropTypes.number.isRequired,
};  

export default TeacherCollection;