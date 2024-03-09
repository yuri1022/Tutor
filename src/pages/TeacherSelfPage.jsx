//teacherselfpage

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
import { useContext } from 'react';
import { AppContext } from "../App";


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
  const [editingContent, setEditingContent] = useState('');
  const [teacherDetails, setTeacherDetails] = useState(null);
  const { id } = useParams();
  const { state } = useContext(AppContext);
  const api = 'http://34.125.232.84:3000';



 useEffect(() => {
    // 在组件内调用外部定义的 fetchTeacherData 函数
   
    const fetchData = async () => {
      try{
      const data = await fetchTeacherData(api, id);
      console.log(state.logindata)
      setTeacherDetails(data);
      }catch(error){
        console.error(error)
      }

    };

    fetchData();
  }, [id, state]);


  
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

  

const handleSave = async (updatedData,editedData, section) => {

   console.log("從 TeacherEditInfo 收到的 updatedData：", updatedData)
   console.log('我在編輯intro嗎',isEditInfo)

  try {
    const token = localStorage.getItem('token');

   const requestData = {
  "name": updatedData.name || teacherDetails.name,
  "nation": updatedData.nation || teacherDetails.nation,
  "nickname": updatedData.nickname || teacherDetails.nickname,
  "avatar": updatedData.avatar || teacherDetails.avatar,
  "category": [1,2,3,4,5],
  "teachStyle": isEditTeachingStyle ? updatedData.teachStyle : teacherDetails.teachStyle,
  "selfIntro": isEditInfo ? updatedData.selfIntro : teacherDetails.selfIntro,
  "mon": true,
  "tue": true,
  "wed": true,
  "thu": true,
  "fri": false,
  "sat": false,
  "sun": false,
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
    const response = await axios.put(`${api}/teacher/${id}`, requestBody, {
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
          <img src={EditImg} alt="edit" onClick={handleEdit} style={{width:'1.2rem',height:'1.2rem',marginRight:'0.5rem'}}/>
        </div>
        </div>
      </div>
      
    {/* 日曆待修改 */}
      <div className="self-class-time-calendar">
        <MyCalendar teacherDetails={teacherDetails}/>
      </div>
    </div>


    </div>

    </div>

    <div className="form-right col-12 col-md-3 col-lg-3">


     <div>
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