//teacherselfpage

import { useParams } from "react-router-dom";
import EditImg from '../assets/images/svg/edit.svg';
import MyCalendar from "../components/teachers/Teacher_profile_Calendar.jsx";
import PropTypes from 'prop-types';
import ClassComments from "../components/teachers/ClassComments.jsx";
import TeacherEditInfo from "../components/teachers/TeacherEditModal.jsx";
import { useState ,useEffect,useContext, useRef } from "react";
import '../assets/scss/teacher.scss';
import { Button } from "react-bootstrap";
import { AppContext } from "../App";
import LoginModal from "../components/LoginModal.jsx";
import { Modal } from 'bootstrap';
import { useNavigate } from "react-router-dom";
import Flag from 'react-world-flags';
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import DefaultImg from '../assets/images/svg/defaultimg.svg';
import { getTeacher,putTeacher } from "../api/teacher.js";
import { get } from "react-hook-form";

const TeacherSelfPage = () => {
  const [editingSection, setEditingSection] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isEditInfo, setIsEditInfo] = useState(false);
  const [isEditTeachingStyle, setIsEditTeachingStyle] = useState(false);
  const [isEditCourse, setIsEditCourse] = useState(false);
  const [editingContent, setEditingContent] = useState('');
  const [teacherDetails, setTeacherDetails] = useState(null);
  const { id } = useParams();
  const { state,dispatch } = useContext(AppContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [teacherDetailsChanged,setTeacherDetailsChanged]=useState(false);
  const loginModal = useRef(null);
  const navigate = useNavigate();
  
 useEffect(() => {
    const fetchData = async () => {
      try{
      const data = await getTeacher(id);
      setTeacherDetails(data.data);
      }catch(error){
        console.error(error)
      }

    };
    fetchData();
    if (teacherDetailsChanged){
      setTeacherDetailsChanged(false);
      fetchData();
    }
  }, [id, setTeacherDetails,teacherDetailsChanged]);

  const openLoginModal = () => {
    loginModal.current?.show();
  };

  const closeLoginModal = () => {
    loginModal.current?.hide();  
  };

  useEffect(()=>{
        loginModal.current = new Modal('#login_Modal',{
            backdrop: 'static'
        });
    },[loginModal.current])

const userId = JSON.parse(localStorage.getItem("userdata"))?.id;

 if (localStorage.getItem("islogin") === "false") {
    return (
 <div className="teacher-redirect-container d-flex" style={{justifyContent:'center'}}>
      <div className="teacher-redirect col-12 col-md-3 col-lg-3" style={{padding:'1rem'}}>
        <div className="teacher-redirect d-flex" style={{flexDirection:'column',boxShadow:'1px 3px 5px 1px var(--main-blue25)',height:'12rem',textAlign:'center',borderRadius:'0.625rem'}}>
        <div className="line"></div>
        <div className="top" style={{marginTop:'5%'}}>
          <h3 style={{color:'var(--red)'}}>Notice</h3>
        </div>
      <div className="title">
        <h5>請登入以查看完整個人資訊</h5> 
      </div>
      <div className="btn-login-back">
      <Link to={"/home"}>
        <Button className="close-button btn btn-light" style={{margin:'0.5rem',color:'var(--main-blue)',border:'1px solid var(--main-blue)',backgroundColor:'transparent'}}>
          返回首頁
        </Button>
        </Link>

       <Button onClick={openLoginModal}  style={{margin:'0.5rem'}}>登入</Button>
      {showLoginModal&& <LoginModal show={showLoginModal} closeLoginModal={closeLoginModal} />}
      </div>
        </div>
      </div>
      </div>
    );
  }
  
  if (localStorage.getItem("islogin") === "true" && userId === parseInt(id, 10)) {
    closeLoginModal();
  } else if (localStorage.getItem("islogin") === "true" && userId !== parseInt(id, 10)) {
    closeLoginModal();
    Swal.fire({
      title: '警告',
      text: '你不是這個人，請你離開',
      icon: 'warning',
      confirmButtonText: '確定'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/home');      
      }
    });
  }

  
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


  

const handleSave = async (updatedData, editedData, section) => {
  try {
    const formData = new FormData();
    formData.append('name', updatedData.name || teacherDetails.name);
    formData.append('nation', updatedData.nation || teacherDetails.nation);
    formData.append('avatar', updatedData.avatar || teacherDetails.avatar);
    formData.append('teachStyle', isEditTeachingStyle ? updatedData.teachStyle : teacherDetails.teachStyle);
    formData.append('selfIntro', isEditInfo ? updatedData.selfIntro : teacherDetails.selfIntro);
    formData.append('mon', updatedData.mon.toString() || teacherDetails.mon.toString());
    formData.append('tue', updatedData.tue.toString() || teacherDetails.tue.toString());
    formData.append('wed', updatedData.wed.toString() || teacherDetails.wed.toString());
    formData.append('thu', updatedData.thu.toString() || teacherDetails.thu.toString());
    formData.append('fri', updatedData.fri.toString() || teacherDetails.fri.toString());
    formData.append('sat', updatedData.sat.toString() || teacherDetails.sat.toString());
    formData.append('sun', updatedData.sun.toString() || teacherDetails.sun.toString());

    // 如果 category 有編輯過，則添加排序後的 category 數據到 FormData 對象中
    if (updatedData.category) {
      const sortedChangedCategory = updatedData.category.slice().sort((a, b) => a - b);
      sortedChangedCategory.forEach((element, index) => {
        formData.append(`category[${index}]`, element);
      });
    } else {
      const originalCategory = [...new Set(teacherDetails.teaching_categories.map(category => category.categoryId))];
      const sortedCategory = originalCategory.slice().sort((a, b) => a - b);
      sortedCategory.forEach((element, index) => {
        formData.append(`category[${index}]`, element);
      });
    }
   const response = await putTeacher(id, formData)
    console.log(formData);

    setTeacherDetails((prevTeacher) => ({
      ...prevTeacher,
      [section]: response.data[section] || prevTeacher[section],
    }));
    setEditingContent(editedData[section] || '');
    closeEdit();
    await getTeacher(id); 
    setTeacherDetailsChanged(true);
    setIsEditInfo(false);
    setIsEditTeachingStyle(false);
    Swal.fire({
      title: 'Success!',
      text: '更新個人檔案成功',
      icon: 'success',
      confirmButtonText: '確定'
    });
    return response.data.data;
  } catch (error) {
    console.error('Error updating teacher:', error);
  }    
  Swal.fire({
      title: 'Fail!',
      text: '更新個人檔案失敗',
      icon: 'warning',
      confirmButtonText: '確定'
    });
};



const handleCancel = () => {
     if (isEditInfo) {
    setEditingContent(teacherDetails.selfIntro); 
  } else if (isEditTeachingStyle) {
    setEditingContent(teacherDetails.teachStyle); 
  }
    setIsEditInfo(false);
    setIsEditTeachingStyle(false);
  };

    if (!teacherDetails) {
    return (
    <div>
      正在加載中...
    </div>)
     ;
  }

  return ( 
  <div>
  <div className="div-container col-12 d-flex" >

    <div className="form-left col-12 col-md-9 col-lg-9">

    <div className="card-container">

     <div className="self-card-container" >
      
      <img className="self-card-img" src={teacherDetails.avatar&& teacherDetails.avatar.length>0 ? teacherDetails.avatar:DefaultImg} alt={teacherDetails.name} />

      <div className="self-info-container">

      <div className="self-name-nation-container">
      <div className="self-nation d-flex" style={{alignItems:'center'}}>
        <Flag code={teacherDetails.nation} height="16" fallback={ <span>Unknown</span> } />
        <h6 className="self-name">{teacherDetails.name}</h6>
      </div>

       <div className="self-edit" style={{alignItems:'end',marginRight:'0.5rem'}}>
      <img src={EditImg} alt="edit" onClick={handleEditModal}/>

        {isEditOpen && (
           <TeacherEditInfo 
           show={isEditOpen} 
           handleClose={closeEdit} 
           handleSave={(editedData) => handleSave(editedData, editingSection)} 
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
                     <div className="edit-icon">
                    <img src={EditImg} alt="edit" style={{width:'1.2rem',height:'1.2rem',marginRight:'0.5rem'}}/>                      
                    </div>
                  ) : (
                    <div className="edit-icon">
                    <img src={EditImg} alt="edit" onClick={() => handleEdit('selfIntro')} style={{width:'1.2rem',height:'1.2rem',marginRight:'0.5rem'}}/>                      
                    </div>
                  )}

        </div>
        
        
      </div>
      
      {isEditInfo ? (
        <>
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  onBlur={() => handleSave({ selfIntro: editingContent }, 'selfIntro')}
                  style={{width:'95%',height:'40%',fontSize:'0.8rem',margin:'0.8rem 1rem 0 1rem',borderColor:'var(--main-blue25)',borderRadius:'0.625rem',resize:'none'}}
                />
         <div className="edit-button">
        <Button className="btn-cancel" variant="secondary" onClick={() => handleCancel('selfIntro')}>取消</Button>
        <Button className="btn-save" variant="primary" onClick={() => handleSave({ selfIntro: editingContent }, 'selfIntro')}>確定</Button>        
                    </div>
                    </>

              ) : (
                <p className="self-info-description">{teacherDetails.selfIntro}</p>
              )}
    </div>


    <div className="teacherstyle-container">
      <div className="self-teaching-style" >
        <div className="self-teaching-style-title">
          <h6 className="title">教學風格</h6>

          {isEditTeachingStyle ? (
                    <div className="edit-icon" >
                    <img src={EditImg} alt="edit" style={{width:'1.2rem',height:'1.2rem',marginRight:'0.5rem'}}/>
                    </div>
                  ) : (
                    <div className="edit-icon" >
                    <img src={EditImg} alt="edit" onClick={() => handleEdit('teachStyle')} style={{width:'1.2rem',height:'1.2rem',marginRight:'0.5rem'}}/>
                    </div>
                  )}
        </div>
        
              
      </div>
      
      {isEditTeachingStyle ? (
        <>
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  onBlur={() => handleSave({ teachStyle: editingContent }, 'teachStyle')}
                  style={{width:'95%',height:'40%',fontSize:'0.8rem',margin:'0.5rem 1rem 0 1rem',borderColor:'var(--main-blue25)',borderRadius:'0.625rem',resize:'none'}}
                 
                />
                    <div className="edit-button">
        <Button className="btn-cancel" variant="secondary" onClick={() => handleCancel('teachStyle')}>取消</Button>            
        <Button className="btn-save" variant="primary" onClick={() => handleSave({ teachStyle: editingContent }, 'teachStyle')}>確定</Button>

                    </div>
                    </>
                
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