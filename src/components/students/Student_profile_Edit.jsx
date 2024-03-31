import { useState,useContext } from 'react'; 
import { AppContext } from '../../App';
import { edit_student_data } from '../../api/student';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types'
const Students_profile_Edit = ({closeEditModal,onMsg})=>{
    const api = 'http://34.125.232.84:3000';
    const studentData = useContext(AppContext).state.logindata.data;
    const student_data = JSON.parse(localStorage.getItem("userdata")).data;
    const [nameTxt,setNameTxt] = useState(student_data.name);
    const [introTxt,setIntroTxt ] = useState(student_data.selfIntro);
    const [ ischangePhoto,setIschangePhoto] = useState(false);
    const [ editImage, setEditImage] = useState({avatar:student_data.avatar});
    const [uploadImageModal, setUploadImageModal] = useState(false);
    const [ file ,setFile] = useState({})
    const {dispatch} = useContext(AppContext);
    const handleImageChange = (e) => {
        setUploadImageModal(true);
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setEditImage(
                {
                    avatar: reader.result
                }
            );
          };
          reader.readAsDataURL(file);
          setFile(file);
          setIschangePhoto(false);
          
        }
      };
    const handleEdit = async(id)=>{
        const token = localStorage.getItem("token");
        const formData = {
            name: nameTxt,
            nickname: '',
            selfIntro: introTxt,
            avatar: file,
        }
        console.log(formData.avatar);
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
        onMsg('edit');
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
                <div className=" w-100 d-flex edit-sm-container">
                    <div className="student_image_block col-4 d-flex flex-column items-center w-sm-100">
                        <div className="d-flex justify-content-center align-items-center mb-10px w-sm-100"><img className="editImage" src={editImage.avatar}></img></div>
                        {ischangePhoto ?
                        (    
                        <div className="w-100 d-flex justify-content-between align-items-center">   
                        <div>請上傳圖片</div>
                        <button type="button" className="close-btn close" data-dismiss="modal" aria-label="Close" onClick={()=>{setIschangePhoto(false)}}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        ):
                        (<button className="btn btn-primary mb-20px" onClick={()=>{handleChangeheadshot()}}>更換大頭貼</button>)
                        }
                        
                        {
                            ischangePhoto &&
                            (   <>
                        <Form>
                        <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control type="file" name="avatar" onChange={handleImageChange} />
                        </Form.Group>
                        </Form>
                                </>
                            )
                        }

                    </div>
                    <div className="col-8 w-sm-100">
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
                <button type="button" className="btn btn-primary" onClick={()=>{handleEdit(student_data.id)}} encType="multipart/form-data">確定</button>
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