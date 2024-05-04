import { useContext,useState,useEffect} from 'react';
import icon_teacher from './../../assets/images/svg/icon_teacher.svg';
import icon_calender from './../../assets/images/svg/icon_calender.svg';
import icon_time from './../../assets/images/svg/icon_time.svg';
import { AppContext } from '../../App';
import { get_student_data } from '../../api/student';
import { delete_register_course } from '../../api/register';
import PropTypes from 'prop-types'
const Students_profile_Go_Class = ({closeGoClassModal,obj_goclass,onMsg}) =>{
    const {dispatch,state} = useContext(AppContext);
    // console.log(obj_goclass);
    const handle_delete_register = async(courseId)=>{
        let student_data = JSON.parse(localStorage.getItem("userdata"));
        const delete_res = await delete_register_course(courseId);
        //console.log(courseId);
        //console.log(delete_res);
        //update data
        // console.log(student_data);
        closeGoClassModal();
        localStorage.setItem('userdata',JSON.stringify(student_data));
        onMsg('delete');
        window.location.reload();

    }

    return(
        <div className="modal studentModal fade" id="goclassStudent_Profile_Modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-md" role="document">
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
                                <div>{obj_goclass.time}分鐘</div>
                            </div>
                            <div className="reserve-button-list">
                                <button type="button" className="btn btn-decline-regisiter" data-dismiss="modal" onClick={()=>{handle_delete_register(obj_goclass.courseId)}}>取消預約</button>
                                <button type="button" className="btn btn-goclass" onClick={closeGoClassModal}>開始上課</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

}
export default Students_profile_Go_Class;

Students_profile_Go_Class.propTypes = {
    closeGoClassModal: PropTypes.func.isRequired,
    obj_goclass: PropTypes.shape({
       teacher: PropTypes.string.isRequired,
       date: PropTypes.any.isRequired,
       time: PropTypes.number.isRequired,
       courseId: PropTypes.number.isRequired,
    })
}