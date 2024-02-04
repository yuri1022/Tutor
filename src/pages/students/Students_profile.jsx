import Navbar from "../../components/Navbar";
import LessonBlock from "../../components/LessonBlock";
const Students_profile = () =>{
    return(
        <>
        <Navbar></Navbar>
        <div className="Profile_container_stu">
            <div className="row">
                <div className="col-4">
                    <div className="left-profile-stu-container">
                        <div><img src="https://picsum.photos/300/300?random=1"></img></div>
                        <div className="intro">
                            <div className="">
                                <div>Kevin</div>
                                <div classNmae="">Nation:</div>
                                <div>
                                    <div>About Me</div>
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis commodi reiciendis asperiores voluptates nostrum eius sed velit deserunt exercitationem voluptatem cum dolor, labore tenetur quis explicabo, inventore consequatur ducimus aliquid.</p>
                                </div>
                            </div>
                            <button>Edit</button>
                        </div>    
                    </div>
                </div>
                <div className="col-8">
                    <div className="right-profile-stu-container">
                        <div>
                            <div className="info-title">New Schedule</div>
                        </div>
                        <div>
                            <div className="info-title">Lesson History</div>
                            <div className="row">
                                <div className="col-6">
                                    <LessonBlock/>
                                </div>
                                <div className="col-6">
                                    <LessonBlock/>
                                </div>
                                <div className="col-6">
                                    <LessonBlock/>
                                </div>
                                <div className="col-6">
                                    <LessonBlock/>
                                </div>
                            </div>
                        </div>
                        <div className="info-ranking">
                            <div className="info-title">我的學習名次</div>
                            <div>Ranking</div>
                        </div>
                 
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Students_profile;