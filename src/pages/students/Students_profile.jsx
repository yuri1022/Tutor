import { useRef,useState,useEffect,useContext } from 'react';
import Students_profile_Calender from "../../components/Student_profile_Calender";
import Students_profile_Edit from "../../components/students/Student_profile_Edit";
import Students_profile_Rating from "../../components/students/Student_profile_Rating";
import Students_profile_Go_Class from "../../components/students/Student_profile_Go_Class";
import { Modal } from 'bootstrap';
import { AppContext } from './../../App';
const Students_profile = () =>{
    const editModal = useRef(null);

    const student_data = JSON.parse(localStorage.getItem("userdata")).data;
    console.log(student_data);

    const openEditModal = () =>{
        editModal.current.show();
    }
    const closeEditModal = () =>{
        editModal.current.hide();
    }
    useEffect(()=>{
        editModal.current = new Modal('#editStudent_Profile_Modal',{
            backdrop: 'static',
        });
    },[])
    return(
        <div>
            <Students_profile_Edit closeEditModal={closeEditModal}/>
            <div className="Profile_container_stu">
                <div className="row">
                    <div className="col-12">
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
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Students_profile;