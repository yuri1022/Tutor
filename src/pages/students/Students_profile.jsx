import { useRef,useState,useEffect,useContext } from 'react';
import Students_profile_Calender from "../../components/Student_profile_Calender";
import Students_profile_Edit from "../../components/students/Student_profile_Edit";
import Students_profile_Rating from "../../components/students/Student_profile_Rating";
import Students_profile_Go_Class from "../../components/students/Student_profile_Go_Class";
import { Modal } from 'bootstrap';
import Notification from '../../components/students/Student_Notification';
import { AppContext } from './../../App';
const Students_profile = () =>{
    const [msg_type,setMsg_type] = useState('');
    const [showToast, setShowToast] = useState(false);
    const editModal = useRef(null);
    const ratingModal = useRef(null);
    const goclassModal = useRef(null);
    const student_data = JSON.parse(localStorage.getItem("userdata")).data;
    // console.log(student_data);
    const handleMsg=(msg)=>{
        if(msg==="delete"){
            setShowToast(true);
            setMsg_type('delete');
        }
        if(msg==="edit"){
            setShowToast(true);
            setMsg_type('edit');
        }
        if(msg==="rating"){
            setShowToast(true);
            setMsg_type('rating');
        }
    }
    const [obj_goclass, setObj_goclass] = useState({
        teacher: '',
        date: new Date(),
        time: 0,
        courseId: 0,
    })
    const [obj_rating,setObj_rating] = useState({
        teacher: '',
        date: new Date(),
        courseId:0,
    })
    const handleShowToast = () => {
        setShowToast(true);
      };
    const openEditModal = () =>{
        editModal.current.show();
    }
    const closeEditModal = () =>{
        editModal.current.hide();
    }
    const openRatingModal = (teacher,date,courseId) =>{
        setObj_rating({
            'teacher': teacher,
            'date': new Date(date),
            'courseId':courseId,
        });
        ratingModal.current.show();
    }
    const closeRatingModal = () =>{
        ratingModal.current.hide();
    }
    const openGoClassModal = (teacher,date,time,courseId) =>{
        setObj_goclass({
            'teacher': teacher,
            'date': new Date(date),
            'time':time,
            'courseId':courseId,
        });
        goclassModal.current.show();
    }
    const closeGoClassModal = () =>{
        goclassModal.current.hide();
    }
    useEffect(()=>{
        editModal.current = new Modal('#editStudent_Profile_Modal',{
            backdrop: 'static',
        });
        ratingModal.current = new Modal('#ratingStudent_Profile_Modal',{
            backdrop: 'static',
        });
        goclassModal.current = new Modal('#goclassStudent_Profile_Modal',{
            backdrop: 'static',
        });
    },[])
    return(
        <div className="student_Profile_Page">
            
            <Students_profile_Go_Class obj_goclass={obj_goclass} closeGoClassModal={closeGoClassModal} onMsg={handleMsg}/>
            <Students_profile_Rating obj_rating={obj_rating} closeRatingModal={closeRatingModal} onMsg={handleMsg}/>
            <Students_profile_Edit closeEditModal={closeEditModal} onMsg={handleMsg}/>
            <div className="Profile_container_stu">
                <div className="grid-container">
                        <div className="left-profile-stu-container">
                            <div className="img-profile-container"><img className="img-profile" src={student_data.avatar}></img></div>
                            <div className="text-title mb-40px">{student_data.name}</div>
                            <div>
                                <div>
                                    <div className="text-title mb-10px">我的學習名次</div>
                                    <div className="rank-block">
                                        <div>{student_data.studyRank}</div>
                                        <div>{student_data.studyHours}hr</div>
                                    </div>
                                </div>
                                <div className="intro-block mb-40px">
                                    <div className="text-title mb-10px">自我介紹</div>
                                    <div className="intro">
                                        <p>{student_data.selfIntro}</p>
                                    </div>
                                </div>
                            </div>    
                            <button type="button" className="btn btn-primary w-100 mb-20px" onClick={openEditModal}>編輯個人檔案</button>
                        </div>
                    
                    
                        <div className="right-profile-stu-container">
                            <Students_profile_Calender  openRatingModal={openRatingModal} openGoClassModal={openGoClassModal}></Students_profile_Calender>
                        </div>
                    

                </div>
            </div>
            <Notification showToast={showToast} setShowToast={setShowToast} mode={msg_type}></Notification>
        </div>
    )
}

export default Students_profile;