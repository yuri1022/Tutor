import { useState,useContext } from 'react'; 
import { AppContext } from '../../App';
import { edit_student_data } from '../../api/student';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types'
const Students_profile_Edit = ({closeEditModal})=>{
    const api = 'http://34.125.232.84:3000';
    const studentData = useContext(AppContext).state.logindata.data;
    const student_data = JSON.parse(localStorage.getItem("userdata")).data;
    const [nameTxt,setNameTxt] = useState(student_data.name);
    const [introTxt,setIntroTxt ] = useState(student_data.selfIntro);
    const [ imageurl,setImageurl] = useState('');
    const [ ischangePhoto,setIschangePhoto] = useState(false);
    const {dispatch} = useContext(AppContext);
    const handleEdit = async(id)=>{
        const token = localStorage.getItem("token");
        const formData = {
            name: nameTxt,
            nickname: '',
            selfIntro: introTxt,
            avatar: imageurl,
        }
        const edit_res =await edit_student_data(id,formData);
        const studentData = await axios.get(`${api}/student/${id}`,{
            headers: { Authorization: `Bearer ${token}` }
        }).then((res)=>{
            console.log(`student data ${res}`);
            localStorage.setItem('userdata',JSON.stringify(res.data));
            dispatch({type:"LOGIN",payload:{logindata:res.data,isTeacher:0,isLogin:true} });
        }).catch(
            err=>{
                console.log(err);
            }
        )
        console.log(edit_res);
        closeEditModal();
    }
    const handleChangeheadshot = ()=>{
        setIschangePhoto(true);
    }
    return(
        <div className="modal fade studentModal" id="editStudent_Profile_Modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

        <div className=" modal-dialog modal-sm modal-lg">
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
                        <div className="mb-10px"><img className="w-100" src={student_data.avatar}></img></div>
                        <button className="btn btn-primary" onClick={()=>{handleChangeheadshot()}}>更換大頭貼</button>
                        {
                            ischangePhoto &&
                            (   <>
                                <div className="title mb-10px">輸入圖片網址</div>
                                <input type="text" className="input-imageurl" value={imageurl} onChange={(e)=>{setImageurl(e.target.value)}}/>
                                </>
                            )
                        }
                    </div>
                    <div className="col-8">
                        <div className="mb-10px">
                            <div className="title mb-10px">姓名</div>
                            <input type="text" className="input-name" value={nameTxt} onChange={(e)=>{setNameTxt(e.target.value)}}/>
                        </div>
                        <div>
                            <div className="title mb-10px">自我介紹</div>
                            <textarea type="text" className="input-intro" value={introTxt} rows={5}  onChange={(e)=>{setIntroTxt(e.target.value)}}/>
                        </div>

                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeEditModal}>取消</button>
                <button type="button" className="btn btn-primary" onClick={()=>{handleEdit(student_data.id)}}>確定</button>
            </div>
            </div>
        </div>
        </div>
    )
}

export default Students_profile_Edit;

Students_profile_Edit.propTypes = {
    closeEditModal: PropTypes.func.isRequired,
}