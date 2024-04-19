import { useRef,useState,useEffect,useContext } from 'react';
import Students_profile_Calender from "../../components/Student_profile_Calender";

import Students_profile_Rating from "../../components/students/Student_profile_Rating";
import Students_profile_Go_Class from "../../components/students/Student_profile_Go_Class";
import { Modal } from 'bootstrap';
import Notification from '../../components/students/Student_Notification';

const Students_profile = () =>{
    const ratingModal = useRef(null);
    const goclassModal = useRef(null);
    const [msg_type,setMsg_type] = useState('');
    const [showToast, setShowToast] = useState(false);
    const student_data = JSON.parse(localStorage.getItem("userdata")).data;
    // console.log(student_data);
    const handleMsg=(msg)=>{
        if(msg==="delete"){
            setShowToast(true);
            setMsg_type('delete');
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
        ratingModal.current = new Modal('#ratingStudent_Profile_Modal',{
            backdrop: true,
        });
        goclassModal.current = new Modal('#goclassStudent_Profile_Modal',{
            backdrop: true,
        });
    },[])
    return(
        <div className="student_Course_Page">
            <Students_profile_Go_Class obj_goclass={obj_goclass} closeGoClassModal={closeGoClassModal} onMsg={handleMsg}/>
            <Students_profile_Rating obj_rating={obj_rating} closeRatingModal={closeRatingModal} onMsg={handleMsg}/>
            <div className="Course_container_stu">
                <div className="row">
                    <div className="col-12">
                        <div className="right-profile-stu-container">
                            <div>
                                <div className="text-title mb-20px" style={{fontWeight:'700'}}>我的行事曆</div>
                                <Students_profile_Calender openRatingModal={openRatingModal} openGoClassModal={openGoClassModal}></Students_profile_Calender>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Notification showToast={showToast} setShowToast={setShowToast} mode={msg_type}></Notification>
        </div>
    )
}

export default Students_profile;