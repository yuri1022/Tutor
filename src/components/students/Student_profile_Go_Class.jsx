import { useEffect} from 'react';
import icon_teacher from './../../assets/images/svg/icon_teacher.svg';
import icon_calender from './../../assets/images/svg/icon_calender.svg';
import icon_time from './../../assets/images/svg/icon_time.svg';
const Students_profile_Go_Class = ({closeGoClassModal,obj_goclass}) =>{

    return(
        <div className="modal fade" id="goclassStudent_Profile_Modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="go_classStuModal_content modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel"></h5>
                        <button type="button" className="close-btn close" data-dismiss="modal" aria-label="Close" onClick={closeGoClassModal}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="reserve-contents">
                            <div className="reserve-bar">
                                <img className="mr-10px" src={icon_teacher}/>
                                <div>{obj_goclass.teacher}</div>
                            </div>
                            <div className="reserve-bar">
                                <img src={icon_calender}/>
                                <div>{obj_goclass.date.getFullYear()}年{obj_goclass.date.getMonth()+1}月{obj_goclass.date.getDate()}日</div>
                                
                            </div>
                            <div className="reserve-bar">
                                <img className="mr-10px"  src={icon_time}/>
                                <div>{obj_goclass.time}</div>
                            </div>
                            <div className="reserve-button-list">
                                <button type="button" className="btn btn-decline-regisiter" data-dismiss="modal" onClick={closeGoClassModal}>取消</button>
                                <button type="button" className="btn btn-goclass">確定</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

}
export default Students_profile_Go_Class;