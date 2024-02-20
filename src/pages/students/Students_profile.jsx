import { useRef,useEffect } from 'react';
import Navbar from "../../components/Navbar";
import Students_profile_Calender from "../../components/Student_profile_Calender";
import Students_profile_Edit from "../../components/Student_profile_Edit";
import headshot01 from './../../assets/images/svg/user大頭貼學生.svg';
import { Modal } from 'bootstrap';
const Students_profile = () =>{
    const editModal = useRef(null);
    
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
            <Students_profile_Edit closeEditModal={closeEditModal}></Students_profile_Edit>
            <Navbar></Navbar>
            <div className="Profile_container_stu">
                <div className="row">
                    <div className="col-3">
                        <div className="left-profile-stu-container">
                            <div className="img-profile"><img className="img-profile" src={headshot01}></img></div>
                            <div className="text-title mb-40px">Agnes</div>
                            
                            <div>
                                <div>
                                    
                                    <div className="text-title mb-10px">我的學習名次</div>
                                    <div className="rank-block">
                                        <div>999</div>
                                        <div>8700hr</div>
                                    </div>
                                </div>
                                <div className="intro-block mb-40px">
                                    <div className="text-title mb-10px">自我介紹</div>
                                    <div className="intro">
                                        <p>Office ipsum you must be muted. Both reach idea we at land bed ditching. Meaningful win-win-win savvy angel like. Dog at anomalies submit replied businesses. It centric want strategic discussions hop six good wanted.</p>
                                    </div>
                                </div>
                            </div>    
                            <button type="button" className="btn btn-primary w-100 mb-20px" onClick={openEditModal}>編輯個人檔案</button>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="right-profile-stu-container">
                            <div>
                                <div className="text-title mb-20px">我的行事曆</div>
                                <Students_profile_Calender></Students_profile_Calender>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Students_profile;