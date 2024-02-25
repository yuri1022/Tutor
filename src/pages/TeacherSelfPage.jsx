import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import NationImg from '../assets/images/svg/canada.svg';
import EditImg from '../assets/images/svg/edit.svg';
import '../assets/scss/teacherpage.scss'
import MyCalendar from "../components/Teacher_profile_Calendar";
import PropTypes from 'prop-types';
import { DummyTeachers } from "../components/TeachersData";
import ClassComments from "../components/ClassComments";
import TeacherEditInfo from "../components/TeacherEditModal";
import { useState ,useEffect } from "react";
import '../assets/scss/teacher.scss';
import { Button } from "react-bootstrap";

const TeacherSelfPage = () => {
  const [editingSection, setEditingSection] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isEditInfo, setIsEditInfo] = useState(false);
  const [isEditTeachingStyle, setIsEditTeachingStyle] = useState(false);
  const [editingContent, setEditingContent] = useState('');

  const [teacher, setTeacher] = useState(null); 


  const { teacher_id } = useParams();
    useEffect(() => {
    // 在這裡取得教師資料，例如從後端拉取
    const fetchedTeacher = DummyTeachers.find((t) => t.teacher_id === teacher_id);
    setTeacher(fetchedTeacher);
  }, [teacher_id]);

  useEffect(() => {
  console.log("更新後的教师信息：", teacher);
}, [teacher]);


  const handleEditModal = (section) => {
    setEditingSection(section);
    setIsEditOpen(true);
    setEditingContent(teacher[section])
  };

  const closeEdit = () => {
    setEditingSection(null);
    setIsEditOpen(false);
  };

 const handleEdit = (section) => {

    if (section === 'info') {
    setIsEditInfo(true);
    setEditingContent(teacher.info);
  } else if (section === 'teaching_style') {
    setIsEditTeachingStyle(true);
    setEditingContent(teacher.teaching_style);
  }
  };

const handleSave = (editedData,section) => {
  // 在這裡可以進行其他保存或提交的操作
    console.log("更新前的教师信息：", teacher);

  // 更新教师信息
setTeacher((prevTeacher) => {
    return {
      ...prevTeacher,
      [section]: editedData[section] || prevTeacher[section],
    };
  });
  setEditingContent(editedData[section] || '');


  closeEdit();
  setIsEditInfo(false);
  setIsEditTeachingStyle(false);
  
};



const handleCancel = () => {
     if (isEditInfo) {
    setEditingContent(teacher.info); // 將編輯內容還原為原始內容
  } else if (isEditTeachingStyle) {
    setEditingContent(teacher.teaching_style); // 將編輯內容還原為原始內容
  }
    setIsEditInfo(false);
    setIsEditTeachingStyle(false);
  };

    if (!teacher) {
    return null; // 或者你可以渲染加载中的 UI
  }

  return ( 
  <div>
    <Navbar />

  <div className="div-container col col-12" >

    <div className="form-left col col-9">

    <div className="card-container">

     <div className="self-card-container" >
      
      <img className="self-card-img" src={teacher.avatar} alt={teacher.name} />

      <div className="self-info-container">

      <div className="self-name-nation-container">
      <div className="self-nation">
        <img src={NationImg} alt={teacher.nation} />
        <h6 className="self-name">{teacher.name}</h6>
      </div>

       <div className="self-edit" style={{alignItems:'end'}}>
      <img src={EditImg} alt="edit" onClick={handleEditModal}/>

        {isEditOpen && (
           <TeacherEditInfo 
           show={isEditOpen} 
           handleClose={closeEdit} 
           handleSave={(editedData) => handleSave(editedData, editingSection)} //传递section参数
          teacher={teacher} 
          editingSection={editingSection}/>
         )}
      </div>

    </div>

    <div className="self-category-container">
        
      <div className="self-category">
      {teacher.category.map((category, index) => (
      <div className="self-teacher-item" key={index}>{category}</div>
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
        <Button variant="secondary" style={{marginRight:'1rem',fontSize:'0.8rem',width:'4rem',backgroundColor:'var(--grey-300',border:'none'}} onClick={() => handleCancel('info')}>取消</Button>
        <Button variant="primary" style={{backgroundColor:'var(--main-blue)',fontSize:'0.8rem',width:'4rem',border:'none'}} onClick={() => handleSave({ info: editingContent }, 'info')}>保存</Button>        
                    </div>
                  ) : (
                    <div className="edit-icon">
                    <img src={EditImg} alt="edit" onClick={() => handleEdit('info')} style={{width:'1.2rem',height:'1.2rem',marginRight:'0.5rem'}}/>                      
                    </div>
                  )}

        </div>
        
        
      </div>
      
      {isEditInfo ? (
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  onBlur={() => handleSave({ info: editingContent }, 'info')}
                  style={{width:'95%',height:'60%',fontSize:'0.8rem',margin:'0.8rem 1rem 0 1rem',borderColor:'var(--main-blue25)',borderRadius:'0.625rem',resize:'none'}}
                />
              ) : (
                <p className="self-info-description">{teacher.info}</p>
              )}
    </div>


    <div className="teacherstyle-container">
      <div className="self-teaching-style" >
        <div className="self-teaching-style-title">
          <h6 className="title">教學風格</h6>

          {isEditTeachingStyle ? (
          <div className="edit-button" style={{position:'absolute',top:'16rem',right:'2rem'}}>
        <Button variant="secondary" style={{marginRight:'1rem',fontSize:'0.8rem',width:'4rem',backgroundColor:'var(--grey-300',border:'none'}} onClick={() => handleCancel('teaching_style')}>取消</Button>            
        <Button variant="primary" style={{backgroundColor:'var(--main-blue)',fontSize:'0.8rem',width:'4rem',border:'none'}} onClick={() => handleSave({ teaching_style: editingContent }, 'teaching_style')}>保存</Button>

                    </div>
                  ) : (
                    <div className="edit-icon" >
                    <img src={EditImg} alt="edit" onClick={() => handleEdit('teaching_style')} style={{width:'1.2rem',height:'1.2rem',marginRight:'0.5rem'}}/>
                    </div>
                  )}
        </div>
        
              
      </div>
      
      {isEditTeachingStyle ? (
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  onBlur={() => handleSave({ teaching_style: editingContent }, 'teaching_style')}
                  style={{width:'95%',height:'80%',fontSize:'0.8rem',margin:'0.5rem 1rem 0 1rem',borderColor:'var(--main-blue25)',borderRadius:'0.625rem',resize:'none'}}
                 
                />
              ) : (
                <p className="self-teaching-style-description">{teacher.teaching_style}</p>
              )}
    </div>

    <div className="classtime-container">
      <div className="self-class-time" >
        <div className="self-class-time-title">
          <h6 className="title">授課時間</h6>
          <div className="edit-icon">
          <img src={EditImg} alt="edit" onClick={handleEdit} style={{width:'1.2rem',height:'1.2rem',marginRight:'0.5rem'}}/>
        </div>
        </div>
      </div>
      
    {/* 日曆待修改 */}
      <div className="self-class-time-calendar">
        <MyCalendar />
      </div>
    </div>


    </div>

    </div>

    <div className="form-right col col-3">


     <ClassComments teacher={teacher} />
 
    </div>

  </div>

   </div>
  );
};


TeacherSelfPage.propTypes = {
  teacher: PropTypes.shape({
    name: PropTypes.string.isRequired,
    teacher_id: PropTypes.string.isRequired,
    nation: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    teaching_style:PropTypes.string.isRequired,
    rating:PropTypes.number.isRequired,
    category: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
};

export default TeacherSelfPage;