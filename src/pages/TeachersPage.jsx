//teacherpage

import { useParams } from "react-router-dom";
import '../assets/scss/teacherpage.scss'
import MyCalendar from "../components/Teacher_profile_Calendar";
import PropTypes from 'prop-types';
import ClassComments from "../components/ClassComments";
import ClassReserve from '../components/ClassReserve.jsx';
import { useState ,useEffect , useContext,useRef } from "react";
import '../assets/scss/teacher.scss';
import { Button } from 'react-bootstrap';
import Flag from 'react-world-flags';
import { Link } from "react-router-dom";
import Login from "../components/Login.jsx";
import ExpandIcon from '../assets/images/svg/expand.svg';
import CollapseIcon from '../assets/images/svg/collapse.svg';
import { getTeacher } from "../api/teacher.js";
import RatingIcon from '../assets/images/svg/rating.svg'

const TeachersPage = () => {
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [isSelfIntroExpanded, setIsSelfIntroExpanded] = useState(true);
  const [isTeachStyleExpanded, setIsTeachStyleExpanded] = useState(true);
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(true);
  const [isNoticeExpanded, setIsNoticeExpanded] = useState(true);
  const [reserveModalOpen,setIsReserveModalOpen]= useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(localStorage.getItem("islogin") === "true");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {

      if (localStorage.getItem("islogin") === "true") {
      setIsUserLoggedIn(true);
      }
      if (localStorage.getItem("islogin") === "false") {
      setIsUserLoggedIn(false);
       }
        if (isUserLoggedIn) {
          const data = await getTeacher(id);
          setTeacherDetails(data.data);
          console.log(data);
        }
      } catch (error) {
        console.error('Error fetching teacher data:', error);
      }
    };

    fetchData();

  }, [id, isUserLoggedIn]);

  console.log(isUserLoggedIn)

// 当登录成功时调用的函数
const handleLoginSuccess = async () => {
  setIsUserLoggedIn(true);
};
  
  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleReserveOpen = () => {
    setIsReserveModalOpen(true);
  };

  const handleReserveClose = () => {
    setIsReserveModalOpen(false);
  };


return (
    <div>
      {isUserLoggedIn ? (
        teacherDetails ? (
                <div>
      
      <div className="div-container col-12 d-flex" >
        <div className="form-left col-12 col-md-9 col-lg-9" >

              

              <div className="card-container" >

              <div className="self-card-container">
              
              <img className="self-card-img" src={teacherDetails.avatar&& teacherDetails.avatar.length>0 ? teacherDetails.avatar:RatingIcon} alt="teacher Avatar" />

              <div className="self-info-container" >

              <div className="self-name-nation-container" >
              <div className="self-nation d-flex" style={{alignItems:'center'}}>
              <Flag code={teacherDetails.nation} height="16" fallback={ <span>Unknown</span> }/>
                <h6 className="self-name">{teacherDetails.name}</h6>
              </div>
              </div>
                <div className="self-category-container">        
                  <div className="self-category">
    {[...new Set(teacherDetails.teaching_categories.map(categories => categories.Category.name).flat())]
      .map((category, index) => (
        <span className="self-teacher-item" key={index}>{category}</span>
      ))}
                    </div>
                </div>
          <div className="pc-reserve-button">
           <Button className="btn-reserve" style={{background:'linear-gradient(#1AEAEA,#3652E3)',border:'none'}} onClick={() => handleReserveOpen()}>
          <div style={{fontSize:'0.875rem'}}>
            預約上課
          </div>
          
          </Button>
        {reserveModalOpen&&        
        <ClassReserve
          teacherDetails={teacherDetails}
          show={reserveModalOpen} 
          handleClose={handleReserveClose}
         />
         }
      </div>    

             </div>

              </div> 

       <div className="reserve-button">
        <Button className="btn-reserve" style={{background:'linear-gradient(#1AEAEA,#3652E3)',border:'none'}} onClick={() => handleReserveOpen()}>
          <div style={{fontSize:'0.875rem'}}>
            預約上課
          </div>
          
          </Button>
        {reserveModalOpen&&        
        <ClassReserve
          teacherDetails={teacherDetails}
          show={reserveModalOpen} 
          handleClose={handleReserveClose}
         />
         }
      </div> 



      <div className="introduction-container">
        
       <div className="self-introduction">
      <div className="self-introduction-title" >
        <h6 className="title" >簡介</h6>
        <span className="expand-icon"
                onClick={() => setIsSelfIntroExpanded(!isSelfIntroExpanded)}>
                {isSelfIntroExpanded ? <img src={CollapseIcon} alt="收合"/> : <img src={ExpandIcon} alt="打開"/>}
              </span>
      </div>
      

      <p className={`self-info-description ${
        isSelfIntroExpanded ? "expanded" : "collapsed"
      }`}> {isSelfIntroExpanded && (
            <p className="self-info-description">{teacherDetails.selfIntro}</p>
          )}</p>
        </div>     
        
        </div>       
      
      
      <div className="teacherstyle-container">
        <div className="self-teaching-style">
      <div className="self-teaching-style-title">
        <h6 className="title">教學風格</h6>
         <span className="expand-icon"
                onClick={() => setIsTeachStyleExpanded(!isTeachStyleExpanded)}>
                {isTeachStyleExpanded ? <img src={CollapseIcon} alt="收合"/> : <img src={ExpandIcon} alt="打開"/>}
              </span>       
      </div>
      
      <p className={`self-teaching-style-description ${
        isTeachStyleExpanded ? "expanded" : "collapsed"
      }`} >{isTeachStyleExpanded && (
            <p className="self-info-description">{teacherDetails.teachStyle}</p>
          )}</p>
    </div>
      </div>

      <div className="classtime-container">

      <div className="self-class-time">
      <div className="self-class-time-title" >
        <h6 className="title">授課時間</h6>
        <span className="expand-icon"
                onClick={() => setIsCalendarExpanded(!isCalendarExpanded)}>
                {isCalendarExpanded ?<img src={CollapseIcon} alt="收合"/> : <img src={ExpandIcon} alt="打開"/>}
              </span>        
      </div>
      
          {/* 日曆待修改 */}
      <div className="self-class-time-calendar" style={{width:'100%'}}>
          <p className={`self-class-time-description ${
        isCalendarExpanded ? "expanded" : "collapsed"
      }`}> {isCalendarExpanded && (
             <MyCalendar teacherDetails={teacherDetails}/>
          )}</p>

       
      </div>
      </div>

      </div>

      <div className="notice-container">
      <div className="teacher-notice">
      <div className="teacher-notice-title">
        <h6 className="title">常見問題</h6>
        <span className="expand-icon"
                onClick={() => setIsNoticeExpanded(!isNoticeExpanded)}>
                {isNoticeExpanded ?<img src={CollapseIcon} alt="收合"/> : <img src={ExpandIcon} alt="打開"/>}</span>        
      </div>
      
      <p className={`teacher-notice-description ${
        isNoticeExpanded ? "expanded" : "collapsed"
      }`} >
        {isNoticeExpanded && (
          <>
           <ul className='teacher-notice-description-item'>
        <li>預約方式</li>
        <ul>
          <li className='item'>可依照教師行事曆的時間預約課程</li> 
        </ul>
                   
        </ul>
        <ul className='teacher-notice-description-item'>
        <li >上課時間說明</li>
        <ul>
          <li className='item'>正式課程課時約為 30 分鐘 / 60 分鐘</li>     
        </ul>
               
        </ul>
        <ul className='teacher-notice-description-item'>
        <li>上課說明</li>
        <ul>
        <li className='item'>開課前 10 分鐘進入網站，點選『頭像』找到該堂課並點選，再點選『開始上課』，即可開啟 ZOOM 教室開始上課</li> 
        <li className='item'>手機、電腦皆可使用 ZOOM 上課（手機請先下載 ZOOM 應用程式）</li>
                  
        </ul>
           
        </ul>
        <ul className='teacher-notice-description-item'>
        <li>退課須知</li>
        <ul>
        <li className='item'>於正式開課前點選『頭像』找到該堂課並點選，再點選『取消預約』，皆可退還 100% 全額課程費用</li>           
        </ul>
           
        </ul>  
        </>        
          )}

           

      </p>
    </div>
      </div>

    </div>
        </div>

        <div className="form-right col-12 col-md-3 col-lg-3" >
          
  
           <div className="card-container">
            <ClassComments teacherDetails={teacherDetails} />
           </div>
        </div>
      </div>
    </div>
        ):(
          <div>
            正在載入中...
            </div>
        )
      ) : (
        <div className="teacher-redirect-container d-flex" style={{ justifyContent: 'center' }}>
          <div className="teacher-redirect col-12 col-md-3 col-lg-3" style={{ padding: '1rem' }}>
            <div className="teacher-redirect d-flex" style={{ flexDirection: 'column', boxShadow: '1px 3px 5px 1px var(--main-blue25)', height: '100%', textAlign: 'center', borderRadius: '0.625rem',padding:'1rem' }}>
              <div className="top" style={{ marginTop: '2%' }}>
                <h3 style={{ color: 'var(--red)' }}>Notice</h3>
              </div>
              <div className="title">
                <h5>請登入以查看完整教師資訊</h5>
              </div>
              <div className="btn-login-back">
                <Link to={"/home"}>
                  <Button className="close-button btn btn-light" style={{ margin: '0.5rem', color: 'var(--main-blue)', border: '1px solid var(--main-blue)', backgroundColor: 'transparent' }}>
                    返回首頁
                  </Button>
                </Link>
                <Button onClick={openLoginModal} style={{ margin: '0.5rem' }}>登入</Button>
                {showLoginModal && <Login show={showLoginModal} onHide={closeLoginModal} handleLoginSuccess={handleLoginSuccess}/>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

TeachersPage.propTypes = {
  teacherDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    nation: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    selfIntro: PropTypes.string.isRequired,
    teachStyle: PropTypes.string.isRequired,
   ratingAverage: PropTypes.string.isRequired,
    teaching_categories: PropTypes.arrayOf(PropTypes.shape({
      categoryId: PropTypes.number.isRequired,
      Category: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })).isRequired,

    Courses: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      duration:PropTypes.number.isRequired,
      category: PropTypes.shape({
      }).isRequired,
      Registrations: PropTypes.shape({
        rating:PropTypes.number.isRequired,
        comment:PropTypes.string.isRequired,
      }).isRequired,
    })).isRequired,
  }),
};

export default TeachersPage;