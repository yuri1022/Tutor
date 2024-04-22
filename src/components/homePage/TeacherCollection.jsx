//teachercollection.jsx

import { useNavigate, useParams,useLocation } from 'react-router-dom';
import { useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import { Card , Button } from 'react-bootstrap';
import RatingStar from '../../assets/images/svg/rating.svg';
import FirstPageArrow from '../../assets/images/svg/arrow-first.svg';
import LastPageArrow from '../../assets/images/svg/arrow-last.svg';
import PrePageArrow from '../../assets/images/svg/previouspage.svg';
import NextPageArrow from '../../assets/images/svg/nextpage.svg'
import { useTeacherContext } from '../context/teachercontext';
import ClassReserve from '../register/ClassReserve';
import Flag from 'react-world-flags';
import Swal from 'sweetalert2';
import DefaultImg from '../../assets/images/svg/defaultimg.svg'
import { getTeacher } from '../../api/teacher';

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

const handlePageChange = (newPage, searchTerm) => {
  let queryString = `?page=${newPage}`;

  if (categoryId) {
    queryString += `&categoryId=${categoryId}`;
  }
  if (searchTerm) {
    queryString += `&keyword=${searchTerm}`;
  }
  navigate(`/home${queryString}`);
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
    if (localStorage.getItem("islogin") === "false"){
    Swal.fire({
      icon: 'info',
      title: '尚未登入!',
      text: '請登入/註冊以查看老師完整資訊',
    });
    return;
  }else{
  navigate(`/teacher/${teacherId}`);
  }
  };



const handleReserveOpen = async (teacher) => {
    if (localStorage.getItem("islogin") === "false"){
    Swal.fire({
      icon: 'info',
      title: '尚未登入!',
      text: '請登入/註冊以預約課程',
    });
    return;
  }
  const fetchTeacherData = async (teacherId) => {
    console.log(teacherId)
  try {
    const response = await getTeacher(teacherId);
    return response.data;
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
let startPage, endPage;
if (totalPages <= maxPages) {
  // 如果總頁數小於等於最大顯示頁數，則起始頁碼為1，結束頁碼為總頁數
  startPage = 1;
  endPage = totalPages;
} else {
  // 否則根據當前頁碼計算起始頁碼和結束頁碼
  if (currentPage <= Math.ceil(maxPages / 2)) {
    // 如果當前頁碼在最大顯示頁數的一半以內，則起始頁碼為1
    startPage = 1;
  } else if (currentPage + Math.floor(maxPages / 2) > totalPages) {
    // 如果當前頁碼加上最大顯示頁數的一半大於總頁數，則起始頁碼為總頁數減去最大顯示頁數加1
    startPage = totalPages - maxPages + 1;
  } else {
    // 其他情況下，起始頁碼為當前頁碼減去最大顯示頁數的一半加1
    startPage = currentPage - Math.floor(maxPages / 2);
  }

  // 計算結束頁碼，不能超過總頁數
  endPage = Math.min(startPage + maxPages - 1, totalPages);
}

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
     <img
     src={teacher.avatar&& teacher.avatar.length>0 ? teacher.avatar:DefaultImg}
     alt="Teacher Avatar"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
        </div>
        <div className="teacher-basic-info">

          
        <div className="teacher-title" >
          <div className="teacher-nation">
            <Flag code={teacher.nation} height="16" fallback={ <span>Unknown</span> } style={{border:'0.1rem solid var(--main-blue25)'}}/>
                         
{/*  */}
            </div>
        <h5 className="teacher-name" >{teacher.name}</h5>
        

        <div className="teacher-rating" >
          <img className="teacher-rating-img" src={RatingStar} alt={teacherData.rating}/>
          <h6 className="teacher-rating-num">            
          {teacher.ratingAverage?
          (parseFloat(teacher.ratingAverage).toFixed(1)):
          ('尚未有評價')
          }</h6>
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
          <img src={NextPageArrow}  alt="下一頁" onClick={handleNextPage}/>
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