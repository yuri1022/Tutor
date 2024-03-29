//teacherselfpage

import { useParams } from "react-router-dom";
import EditImg from '../assets/images/svg/edit.svg';
import '../assets/scss/teacherpage.scss'
import MyCalendar from "../components/Teacher_profile_Calendar";
import PropTypes from 'prop-types';
import ClassComments from "../components/ClassComments";
import TeacherEditInfo from "../components/TeacherEditModal";
import { useState ,useEffect,useContext, useRef } from "react";
import '../assets/scss/teacher.scss';
import { Button } from "react-bootstrap";
import axios from "axios";
import { AppContext } from "../App";
import LoginModal from "../components/LoginModal.jsx";
import { Modal } from 'bootstrap';
import { useNavigate } from "react-router-dom";
import Flag from 'react-world-flags';
import Swal from "sweetalert2";



const fetchTeacherData = async (api,id) => {
  try {
    

    const token = localStorage.getItem('token');
    const response = await axios.get(`${api}/teacher/${id}/personal`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data.data;
  } catch (error) {
    // 处理错误
    console.error('Error fetching teacher data:', error);
    throw error;
  }
};



const TeacherSelfPage = () => {
  const [editingSection, setEditingSection] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isEditInfo, setIsEditInfo] = useState(false);
  const [isEditTeachingStyle, setIsEditTeachingStyle] = useState(false);
  const [isEditCourse, setIsEditCourse] = useState(false);

  const [editingContent, setEditingContent] = useState('');
  const [teacherDetails, setTeacherDetails] = useState(null);
  const { id } = useParams();
  const { state } = useContext(AppContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const loginModal = useRef(null);
  const navigate = useNavigate();

  const api = 'http://34.125.232.84:3000';



 useEffect(() => {
    const fetchData = async () => {
      try{
      const data = await fetchTeacherData(api, id);
      // console.log(state.logindata)
      setTeacherDetails(data);
      }catch(error){
        console.error(error)
      }

    };

    fetchData();
  }, [id, state]);

  const openLoginModal = () => {
    loginModal.current.show();
  };

  const closeLoginModal = () => {
    loginModal.current.hide();  
  };

  useEffect(()=>{
        loginModal.current = new Modal('#login_Modal',{
            backdrop: 'static'
        });
    },[])

const userId = JSON.parse(localStorage.getItem("userdata"))?.data?.id;

useEffect(()=>{

if (localStorage.getItem("islogin") !== "true") {
  return (
    <div>
      <div>
        請登入以查看個人檔案
      </div>
      <Button onClick={openLoginModal}>登入</Button>
      <LoginModal show={showLoginModal} closeLoginModal={closeLoginModal} />
    </div>
  );
} else if (userId !== parseInt(id, 10)) {
  // 用户已登录，但ID不匹配，弹出警告并执行页面跳转
  Swal.fire({
    title: '警告',
    text: '你不是這個人，請你離開',
    icon: 'warning',
    confirmButtonText: '確定'
  }).then((result) => {
    if (result.isConfirmed) {
      // 用户点击了确认按钮，执行页面跳转
      navigate('/home');
    }
  });
  return null; 
}

},[]);




  
  const handleEditModal = (section) => {
    
    setEditingSection({
    name: true,
    nation: true,
    category: true,
    avatar: true,
  });
  setIsEditOpen(true);
  setEditingSection(section);
  };
  const closeEdit = () => {
    setEditingSection(null);
    setIsEditOpen(false);
  };

 const handleEdit = (section) => {

    if (section === 'selfIntro') {
    setIsEditInfo(true);
    setEditingContent(teacherDetails.selfIntro);
  } else if (section === 'teachStyle') {
    setIsEditTeachingStyle(true);
    setEditingContent(teacherDetails.teachStyle);
  }
  
  
  };

  const handleEditCourse = () =>{
    setIsEditCourse(true);
  };
  const closeEditCourse = () => {
    setIsEditCourse(false);
    setIsEditOpen(false);
  };


  

const handleSave = async (updatedData,editedData, section) => {

  //  console.log("從 TeacherEditInfo 收到的 updatedData：", updatedData)
  //  console.log('我在編輯intro嗎',isEditInfo)

  try {
    const token = localStorage.getItem('token');
    const originalCategory = (teacherDetails.teaching_categories.map(categories => categories.categoryId))
    console.log(originalCategory)
    console.log(updatedData.category)

   const requestData = {
  "name": updatedData.name || teacherDetails.name,
  "nation": updatedData.nation || teacherDetails.nation,
  "category": updatedData.category || originalCategory,
  "avatar": updatedData.avatar || teacherDetails.avatar,
  "teachStyle": isEditTeachingStyle ? updatedData.teachStyle : teacherDetails.teachStyle,
  "selfIntro": isEditInfo ? updatedData.selfIntro : teacherDetails.selfIntro,
  "mon": teacherDetails.mon.toString(),
  "tue": teacherDetails.tue.toString(),
  "wed": teacherDetails.wed.toString(),
  "thu": teacherDetails.thu.toString(),
  "fri": teacherDetails.fri.toString(),
  "sat": teacherDetails.sat.toString(),
  "sun": teacherDetails.sun.toString(),
};
    // 检查哪些数据发生了更改
    const changedData = {};
    Object.keys(requestData).forEach((key) => {
      if (requestData[key] !== teacherDetails[key]) {
        changedData[key] = requestData[key];
      }
    });

    // 如果没有更改，不发送请求
    if (Object.keys(changedData).length === 0) {
      return;
    }
    const requestBody = JSON.stringify(requestData)
    console.log('reqeustBody:', requestBody);  
    const response = await axios.put(`${api}/teacher/${id}`, requestData, {
      headers: { Authorization: `Bearer ${token}` },
      
    });
    
    // 處理成功更新的情況，例如更新本地 state
    setTeacherDetails((prevTeacher) => ({
      ...prevTeacher,
      [section]: response.data.data[section] || prevTeacher[section],
    }));
      
    setEditingContent(editedData[section] || '');
    
    closeEdit();
    setIsEditInfo(false);
    setIsEditTeachingStyle(false);
    return response.data.data;
  } catch (error) {
    // 處理錯誤
    console.error('Error updating teacher:', error);
  }
};



const handleCancel = () => {
     if (isEditInfo) {
    setEditingContent(teacherDetails.selfIntro); // 將編輯內容還原為原始內容
  } else if (isEditTeachingStyle) {
    setEditingContent(teacherDetails.teachStyle); // 將編輯內容還原為原始內容
  }
    setIsEditInfo(false);
    setIsEditTeachingStyle(false);
  };

    if (!teacherDetails) {
    return null; // 或者你可以渲染加载中的 UI
  }

  return ( 
  <div>
  <div className="div-container col-12 d-flex" >

    <div className="form-left col-12 col-md-9 col-lg-9">

    <div className="card-container">

     <div className="self-card-container" >
      
      <img className="self-card-img" src={teacherDetails.avatar} alt={teacherDetails.name} />

      <div className="self-info-container">

      <div className="self-name-nation-container">
      <div className="self-nation d-flex" style={{alignItems:'center'}}>
        <Flag code={teacherDetails.nation} height="16" fallback={ <span>Unknown</span> } />
        <h6 className="self-name">{teacherDetails.name}</h6>
      </div>

       <div className="self-edit" style={{alignItems:'end'}}>
      <img src={EditImg} alt="edit" onClick={handleEditModal}/>

        {isEditOpen && (
           <TeacherEditInfo 
           show={isEditOpen} 
           handleClose={closeEdit} 
           handleSave={(editedData) => handleSave(editedData, editingSection)} //传递section参数
          teacherDetails={teacherDetails} 
          editingSection={editingSection}/>
         )}
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

      </div> 
      </div>

    <div className="introduction-container">
      <div className="self-introduction">
        <div className="self-introduction-title">
          <h6 className="title">簡介</h6>
        {isEditInfo ? (
          <div className="edit-button" style={{position:'absolute',top:'9.5rem',right:'2rem'}}>
        <Button variant="secondary" style={{marginRight:'1rem',fontSize:'0.8rem',width:'4rem',backgroundColor:'var(--grey-300',border:'none'}} onClick={() => handleCancel('selfIntro')}>取消</Button>
        <Button variant="primary" style={{backgroundColor:'var(--main-blue)',fontSize:'0.8rem',width:'4rem',border:'none'}} onClick={() => handleSave({ selfIntro: editingContent }, 'selfIntro')}>保存</Button>        
                    </div>
                  ) : (
                    <div className="edit-icon">
                    <img src={EditImg} alt="edit" onClick={() => handleEdit('selfIntro')} style={{width:'1.2rem',height:'1.2rem',marginRight:'0.5rem'}}/>                      
                    </div>
                  )}

        </div>
        
        
      </div>
      
      {isEditInfo ? (
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  onBlur={() => handleSave({ selfIntro: editingContent }, 'selfIntro')}
                  style={{width:'95%',height:'60%',fontSize:'0.8rem',margin:'0.8rem 1rem 0 1rem',borderColor:'var(--main-blue25)',borderRadius:'0.625rem',resize:'none'}}
                />
              ) : (
                <p className="self-info-description">{teacherDetails.selfIntro}</p>
              )}
    </div>


    <div className="teacherstyle-container">
      <div className="self-teaching-style" >
        <div className="self-teaching-style-title">
          <h6 className="title">教學風格</h6>

          {isEditTeachingStyle ? (
          <div className="edit-button" style={{position:'absolute',top:'16rem',right:'2rem'}}>
        <Button variant="secondary" style={{marginRight:'1rem',fontSize:'0.8rem',width:'4rem',backgroundColor:'var(--grey-300',border:'none'}} onClick={() => handleCancel('teachStyle')}>取消</Button>            
        <Button variant="primary" style={{backgroundColor:'var(--main-blue)',fontSize:'0.8rem',width:'4rem',border:'none'}} onClick={() => handleSave({ teachStyle: editingContent }, 'teachStyle')}>保存</Button>

                    </div>
                  ) : (
                    <div className="edit-icon" >
                    <img src={EditImg} alt="edit" onClick={() => handleEdit('teachStyle')} style={{width:'1.2rem',height:'1.2rem',marginRight:'0.5rem'}}/>
                    </div>
                  )}
        </div>
        
              
      </div>
      
      {isEditTeachingStyle ? (
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  onBlur={() => handleSave({ teachStyle: editingContent }, 'teachStyle')}
                  style={{width:'95%',height:'80%',fontSize:'0.8rem',margin:'0.5rem 1rem 0 1rem',borderColor:'var(--main-blue25)',borderRadius:'0.625rem',resize:'none'}}
                 
                />
              ) : (
                <p className="self-teaching-style-description">{teacherDetails.teachStyle}</p>
              )}
    </div>

    <div className="classtime-container">
      <div className="self-class-time" >
        <div className="self-class-time-title">
          <h6 className="title">授課時間</h6>
          <div className="edit-icon">
          <img src={EditImg} alt="edit" style={{width:'1.2rem',height:'1.2rem',marginRight:'0.5rem'}} onClick={() => handleEditCourse(true)}/>
        </div>
        </div>
      </div>
      
    {/* 日曆待修改 */}
      <div className="self-class-time-calendar">
  {isEditCourse ? (
    <MyCalendar
      teacherDetails={teacherDetails}
      isEditCourse={isEditCourse}
      handleEditCourse={handleEditCourse}
      closeEditCourse={closeEditCourse}
    />

  ) : (
    <MyCalendar teacherDetails={teacherDetails} />
  )}
      </div>
    </div>


    </div>

    </div>

    <div className="form-right col-12 col-md-3 col-lg-3">


     <div className="card-container">
      <ClassComments teacherDetails={teacherDetails} />
      </div>
 
    </div>

  </div>
   </div>
  
  );
};


TeacherSelfPage.propTypes = {
  teacherDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    nation: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    selfIntro: PropTypes.string.isRequired,
    teachStyle: PropTypes.string.isRequired,
    ratingAverage: PropTypes.string.isRequired,
    Courses: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      teacherId: PropTypes.number.isRequired,
      category: PropTypes.arrayOf(PropTypes.string).isRequired,
      name: PropTypes.string.isRequired,
      intro: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      startAt: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
      Registrations: PropTypes.arrayOf(PropTypes.shape({
        rating: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
      })).isRequired,
    })).isRequired,
    teaching_categories: PropTypes.arrayOf(PropTypes.shape({
      categoryId: PropTypes.number.isRequired,
      Category: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })).isRequired,
  }),
};
export default TeacherSelfPage;