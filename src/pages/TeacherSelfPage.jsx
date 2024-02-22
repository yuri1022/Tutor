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

const TeacherSelfPage = () => {
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


  const handleEditModal = () => {
    setIsEditOpen(true);
  };

  const closeEdit = () => {
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
    console.log("更新中的 prevTeacher：", prevTeacher);
    return {
      ...prevTeacher,
      [section]: editedData[section] || prevTeacher[section],
    };
  });
  setEditingContent(editedData[section] || '');

  console.log("更新後的教师信息：", teacher);


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

  <div className="self-container col col-12" style={{marginTop:'6%',display:'flex'}}>

    <div className="self-left-basicinfo col col -9" style={{width:'100%'}}>

    <div className="self-card" style={{display:'flex'}}>

     <div className="self-card-container" >
      
      <img src={teacher.avatar} alt={teacher.name} />
      </div> 
    

    <div className="self-card-info-container">

      <div className="self-name-nation-container" style={{display:'flex',justifyContent: 'space-between',alignItems: 'center'}}>
      <div className="self-nation" style={{display:'flex'}}>
        <img src={NationImg} alt={teacher.nation} />
        <h6 className="self-name">{teacher.name}</h6>
      </div>

       <div className="self-edit" style={{display:'flex',flexDirection:'column',alignItems:'end'}}>
      <img src={EditImg} alt="edit" onClick={handleEditModal}/>

        {isEditOpen && (
           <TeacherEditInfo show={isEditOpen} handleClose={closeEdit} handleSave={handleSave} teacher={teacher}/>
         )}
      </div>

      </div>

      <div className="self-category-container">
        
      <div className="self-category">
      {teacher.category}
      </div>

    </div>

    </div>


    </div>

    <div className="self-introduction">
      <div className="self-introduction-title-edit" style={{display:'flex',justifyContent:'space-between'}}>
        <h6 className="self-inrtoduction-title">簡介</h6>
        {isEditInfo ? (
          <>
        <button onClick={() => handleSave({ info: editingContent }, 'info')}>保存</button>
        <button onClick={() => handleCancel('info')}>取消</button>
                    </>
                  ) : (
                    <img src={EditImg} alt="edit" onClick={() => handleEdit('info')} />
                  )}
      </div>
      

      {isEditInfo ? (
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  onBlur={() => handleSave({ info: editingContent }, 'info')}

                />
              ) : (
                <p className="self-info-description" style={{ fontSize: '14px', width: '60%' }}>
                  {teacher.info}
                </p>
              )}
    </div>


    <div className="self-teaching-style">
      <div className="self-teaching-style-title-edit" style={{display:'flex',justifyContent:'space-between'}}>
        <h6 className="self-teaching-style-title">教學風格</h6>
              {isEditTeachingStyle ? (
          <>
        <button onClick={() => handleSave({ teaching_style: editingContent }, 'teaching_style')}>保存</button>
        <button onClick={() => handleCancel('teaching_style')}>取消</button>
                    </>
                  ) : (
                    <img src={EditImg} alt="edit" onClick={() => handleEdit('teaching_style')} />
                  )}
      </div>
      
      {isEditTeachingStyle ? (
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  onBlur={() => handleSave({ teaching_style: editingContent }, 'teaching_style')}

                />
              ) : (
                <p className="self-info-description" style={{ fontSize: '14px', width: '60%' }}>
                  {teacher.teaching_style}
                </p>
              )}
    </div>

        <div className="self-class-time">
      <div className="self-class-time-title-edit" style={{display:'flex',justifyContent:'space-between'}}>
        <h6 className="self-class-time-title">授課時間</h6>
       <img src={EditImg} alt="edit" onClick={handleEdit}/>
      </div>
      

      <div className="self-class-time-calendar" style={{fontSize:'14px',width:'60%'}}>
        <MyCalendar />
      </div>
    </div>


    </div>

    <div className="self-right col col -3" style={{width:'100%'}}>


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