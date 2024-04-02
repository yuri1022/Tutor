//teachercollection.jsx

import { useNavigate, useParams,useLocation } from 'react-router-dom';
import { useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import '../main.scss'
import { Card , Button } from 'react-bootstrap';
import RatingStar from '../assets/images/svg/rating.svg';
import FirstPageArrow from '../assets/images/svg/arrow-first.svg';
import LastPageArrow from '../assets/images/svg/arrow-last.svg';
import PrePageArrow from '../assets/images/svg/previouspage.svg';
import NextPageArrow from '../assets/images/svg/nextpage.svg'
import '../assets/scss/homepage.scss';
import { useTeacherContext } from './teachercontext';
import ClassReserve from './ClassReserve';
import axios from 'axios';
import Flag from 'react-world-flags';
import Swal from 'sweetalert2';

const api = 'http://34.125.232.84:3000';


const TeacherCollection = () => {
 const { page } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const categoryId = queryParams.get('categoryId');
  const [categoryItemId, setCategoryItemId] = useState(categoryId);
  const [currentPageState, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { teacherData } = useTeacherContext();
  const { currentPage, totalPages } = teacherData;
  const [reserveModalOpen,setIsReserveModalOpen]= useState(false);
  const [reserveTeacher, setReserveTeacher] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

const categoryOptions = teacherData?.categories?.map(category => ({
  id: category.id,
  name: category.name
}));

  useEffect(() => {
    setCategoryItemId(categoryId);
  }, [categoryId]);

 useEffect(() => {
    console.log('Current categoryId:', categoryItemId);
    console.log('Current totalPages:', totalPages);
      }, [page,categoryItemId,currentPage,totalPages]);

  const handlePageChange = (newPage) => {
     if (categoryId) {
    navigate(`/home?page=${newPage}&categoryId=${categoryId}`);
  } else {
    navigate(`/home?page=${newPage}`);
  }
    window.scrollTo(0, 0);
  };


   const handlePreviousPage = () => {
    const newPage = currentPage > 1 ? currentPage - 1 : 1;
    handlePageChange(newPage);
    setCurrentPage(newPage);
  if (currentPage === 1) {
    Swal.fire({
      icon: 'info',
      title: '已到達第一頁',
      text: '已經是第一頁了！',
    });
  }
  };

  const handleNextPage = () => {
    const newPage = currentPage < totalPages ? currentPage + 1 : totalPages;
    handlePageChange(newPage);
    setCurrentPage(newPage);
  if (currentPage === totalPages) {
    Swal.fire({
      icon: 'info',
      title: '已到達最後一頁',
      text: '已經是最後一頁了！',
    });
  }
  };

  const handleFirstPage = () => {
    handlePageChange(1);
    if (currentPage === 1) {
    Swal.fire({
      icon: 'info',
      title: '已到達第一頁',
      text: '已經是第一頁了！',
    });
  }
  };

  const handleLastPage = () => {
    handlePageChange(totalPages);
   if (currentPage === totalPages) {
    Swal.fire({
      icon: 'info',
      title: '已到達最後一頁',
      text: '已經是最後一頁了！',
    });
  }
  };  


  const handleButtonClick = (teacherId) => {
  // 假設你有一個 teacher 物件，其中包含 id 屬性
  navigate(`/teacher/${teacherId}`);

  };



const handleReserveOpen = async (teacher) => {

  const fetchTeacherData = async (teacherId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${api}/teacher/${teacherId}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data.data;
  } catch (error) {
    if (error.response) {
      console.error("Server error:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("No response from server");
    } else {
      console.error("Request failed:", error.message);
    }
    throw error;
  }
};
  // 獲取教師數據
  const teacherData = await fetchTeacherData(teacher.id);
  setReserveTeacher(teacherData);
  setIsReserveModalOpen(true);
};
  

  const handleReserveClose = () => {
    setIsReserveModalOpen(false);
  };

  
const uniqueCategories = categoryOptions
  ? ['所有類別', ...categoryOptions.map(category => category.name)]
  : ['所有類別'];


const handleCategoryChange = (selectedCategoryItemId) => {
  // 根據選中的類別 ID 設定 selectedCategoryId 狀態
  setSelectedCategoryId(selectedCategoryItemId);

  // 從所有的 teaching_categories 中找到對應的 categoryId
  const categoryIdFromTeachingCategories = selectedCategoryItemId
    ? teacherData.categories.find(category => category.name === selectedCategoryItemId)?.id
    : null;

  const categoryIdParam = categoryIdFromTeachingCategories
    ? `&categoryId=${categoryIdFromTeachingCategories}`
    : '';

  // 更新 URL 參數，包含頁碼和類別 ID
  navigate(`/home?page=${currentPageState}${categoryIdParam}`);

  // 設定當前頁面狀態為 1，因為類別切換後應該回到第 1 頁
  setCurrentPage(1);
};

const maxPages = window.innerWidth < 480 ? 5 : 10;
const startPage = currentPage <= maxPages/2 ? 1 : currentPage - maxPages +3;
const endPage = Math.min(startPage + maxPages - 1, totalPages);

  return (

    
  <div className="div-container__home col col-12" >

      <div className='category-buttons-container d-flex col-12'>
        <div className="category-buttons">
          {/* 動態生成按鈕 */}
      {categoryOptions && uniqueCategories.map((category) => (
      <Button
 className={`category-buttons-item ${category === (selectedCategoryId === null ? '所有類別' : selectedCategoryId) ? 'selected' : ''}`}
        key={category}
        variant="outline-light"
        onClick={() => handleCategoryChange(category === '所有類別' ? null : category)}
       >
    {category}
  </Button>
))}
        </div>
      </div>


    <div className="div-container col-12">
    {teacherData.teachers && teacherData.teachers.map((teacher) => (

      <div className="div-container__info col-12" key={teacher.id}>
        <Card className="card">
        <Card.Body >
        <div className="teacher-top">
        <div className="teacher-img">
        <img src={teacher.avatar} alt={teacher.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
        </div>
        <div className="teacher-basic-info">

          
        <div className="teacher-title" >
          <div className="teacher-nation">
            <Flag code={teacher.nation} height="16" fallback={ <span>Unknown</span> }/>

            </div>
        <h5 className="teacher-name" >{teacher.name}</h5>
        

        <div className="teacher-rating" >
          <img className="teacher-rating-img" src={RatingStar} alt={teacherData.rating}/>
          <h6 className="teacher-rating-num">            
          {parseFloat(teacher.ratingAverage).toFixed(1)}</h6>
          </div>

      <div className="teacher-reserve-button">
      
      <button className="btn-reserve btn btn-outline-secondary"  onClick={() => handleReserveOpen(teacher)}>預約課程</button>

        {reserveModalOpen&&        
        <ClassReserve
          teacherDetails={reserveTeacher}
          show={reserveModalOpen} 
          handleClose={handleReserveClose}
         />
         }

    </div>
        
        </div>
        </div>
        </div>

        <div className="teacher-category-container" >
         <div className="teacher-category" >
 {[...new Set(teacher.teaching_categories.map(category => category.Category.name))].map((category, index) => (
      <div className="teacher-item" key={index}>
        {category}
      </div>
    ))}
              
</div>

        </div>

       
        <div className="teacher-info">
          <p className="teacher-info-text" >{teacher.selfIntro.slice(0, 90)}</p>
          </div>
        
     
   <div className="button-see-more" >
      
      <button className="btn-see-more btn btn-outline-light" onClick={() => handleButtonClick(teacher.id)}>瀏覽更多</button>
    </div>
     </Card.Body>
   </Card>
   </div>
    ))}
</div>


      <div className="pagination col-12">

        <div className="pagination-control">

        <div className="pagination-control-first">
          <img src={FirstPageArrow} alt="首頁" onClick={handleFirstPage}/>
        </div>
        <div className="pagination-control-prev">
          <img src={PrePageArrow} alt="上一頁" onClick={handlePreviousPage}/>
        </div>
        
        <div className="pagination-control-page">
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
              <button
                key={startPage + index}
                className={`btn ${currentPage === startPage + index ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => handlePageChange(startPage + index)}
                style={{ border: 'none' }}
              >
                {startPage + index}
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