import { useState, useEffect } from 'react'; 
import headshot01 from './../../assets/images/svg/user大頭貼學生.svg';

const Students_profile_Edit = ({closeEditModal})=>{
    const [nameTxt,setNameTxt] = useState("");
    const [introTxt,setIntroTxt ] = useState("");
    return(
        <div className="modal fade" id="editStudent_Profile_Modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
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
                <button type="button" className="btn btn-primary">確定</button>
            </div>
            </div>
        </div>
        </div>
    )
}

export default Students_profile_Edit;