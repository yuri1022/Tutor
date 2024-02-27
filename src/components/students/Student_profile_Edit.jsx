import { useState, useEffect, useContext } from 'react'; 
import headshot01 from './../../assets/images/svg/user大頭貼學生.svg';
import { AppContext } from '../../App';
import { edit_student_data } from '../../api/student';
const Students_profile_Edit = ({closeEditModal})=>{
    const studentData = useContext(AppContext).state.logindata.data;
    const [nameTxt,setNameTxt] = useState(studentData?.name);
    const [introTxt,setIntroTxt ] = useState(studentData?.selfIntro);
    const handleEdit = async(id)=>{
        const formData = {
            name: nameTxt,
            nickname: '',
            selfIntro: introTxt,
            avatar: '',
        }
        const res =await edit_student_data(id,formData);
    }
    return(
        <div className="modal fade" id="editStudent_Profile_Modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
            <div className="editStuModal_content modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel"></h5>
                <button type="button" className="close-btn close" data-dismiss="modal" aria-label="Close" onClick={closeEditModal}>
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="row">
                    <div className="col-4 d-flex flex-column items-center">
                        <div className="mb-10px"><img className="w-100" src={headshot01}></img></div>
                        <button className="btn btn-primary">更換大頭貼</button>
                    </div>
                    <div className="col-8">
                        <div className="mb-10px">
                            <div className="title mb-10px">姓名</div>
                            <input className="input-name" value={nameTxt} onChange={(e)=>{setNameTxt(e.target.value)}}/>
                        </div>
                        <div>
                            <div className="title mb-10px">自我介紹</div>
                            <textarea className="input-intro" value={introTxt} rows={5}  onChange={(e)=>{setIntroTxt(e.target.value)}}/>
                        </div>

                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeEditModal}>取消</button>
                <button type="button" className="btn btn-primary" onClick={()=>{handleEdit(studentData.id)}}>確定</button>
            </div>
            </div>
        </div>
        </div>
    )
}

export default Students_profile_Edit;