import Navbar from "../../components/Navbar";
import Students_profile_Calender from "../../components/Student_profile_Calender";
const Students_profile = () =>{

    return(
        <div>
        <Navbar></Navbar>
        <div className="Profile_container_stu">
            <div className="row">
                <div className="col-3">
                    <div className="left-profile-stu-container">
                        <div className="img-profile"><img className="img-profile" src="https://picsum.photos/300/300?random=1"></img></div>
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
                        <button className="btn btn-primary w-100 mb-20px">編輯個人檔案</button>
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