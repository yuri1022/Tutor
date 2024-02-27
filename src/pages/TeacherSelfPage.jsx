import { useParams } from "react-router-dom";
import NationImg from '../assets/images/svg/canada.svg';
import EditImg from '../assets/images/svg/edit.svg';
import '../assets/scss/teacherpage.scss'
import MyCalendar from "../components/Teacher_profile_Calendar";
import PropTypes from 'prop-types';
import ClassComments from "../components/ClassComments";
import TeacherEditInfo from "../components/TeacherEditModal";
import { useState ,useEffect } from "react";
import '../assets/scss/teacher.scss';
import { Button } from "react-bootstrap";
import axios from "axios";



const TeacherSelfPage = () => {
  const [editingSection, setEditingSection] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isEditInfo, setIsEditInfo] = useState(false);
  const [isEditTeachingStyle, setIsEditTeachingStyle] = useState(false);
  const [editingContent, setEditingContent] = useState('');
  const [teacherDetails, setTeacherDetails] = useState(null);
  const { id } = useParams();
  console.log('ID',id);
  const api = 'http://34.125.232.84:3000';



  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${api}/teacher/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        console.log(`${api}/teacher/${id}`)
        setTeacherDetails(response.data.data)
        return response.data.data;
        
      } catch (error) {
        if (error.response) {
            // 请求已发出，但服务器返回错误响应
            console.error("Server error:", error.response.status, error.response.data);
        } else if (error.request) {
            // 请求已发出，但没有收到响应
            console.error("No response from server");
        } else {
            // 发送请求时出了点问题
            console.error("Request failed:", error.message);
        }
        // 可以在这里处理错误，例如显示适当的错误消息给用户
        throw error; // 继续抛出错误，以便在调用 apiLoginSubmit 的地方可以进一步处理
    }
    };

    fetchTeacherData();
  }, [id]);
  
  const handleEditModal = (section) => {
    setEditingSection({
    name: true,
    nation: true,
    category: true,
    avatar: true,
  });
    setEditingSection(section);
    setIsEditOpen(true);
    setEditingContent(teacherDetails[section])
  };

  const closeEdit = () => {
    setEditingSection(null);
    setIsEditOpen(false);
  };

 const handleEdit = (section) => {

    if (section === 'selfIntro') {
    setIsEditInfo(true);
    setEditingContent(teacherDetails.selfIntro);
  } else if (section === 'teaching_style') {
    setIsEditTeachingStyle(true);
    setEditingContent(teacherDetails.teaching_style);
  }
  };

const handleSave = (editedData,section) => {
  // 在這裡可以進行其他保存或提交的操作
    console.log("更新前的教师信息：", teacherDetails);

  // 更新教师信息
setTeacherDetails((prevTeacher) => {
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
  <div className="div-container col col-12" >

    <div className="form-left col col-9">

    <div className="card-container">

     <div className="self-card-container" >
      
      <img className="self-card-img" src={teacherDetails.avatar} alt={teacherDetails.name} />

      <div className="self-info-container">

      <div className="self-name-nation-container">
      <div className="self-nation">
        <img src={NationImg} alt={teacherDetails.nation} />
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
      {teacherDetails.Courses.map((course, index) => (
    <span key={index}>{course.Category}</span>
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
                  onBlur={() => handleSave({ info: editingContent }, 'info')}
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


     <ClassComments teacherDetails={teacherDetails} />
 
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
    rating: PropTypes.number.isRequired,
    Courses: PropTypes.arrayOf(PropTypes.shape({
      Category: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })).isRequired,
  }),
};

export default TeacherSelfPage;