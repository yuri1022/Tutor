import { useState, } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import icon_google from './../assets/images/svg/icon_google.svg';
import icon_fb from './../assets/images/svg/icon_facebook.svg';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const LoginModal = ({show,closeLoginModal,onNavbar}) =>{
    const [mode ,setMode] = useState('signup');
    const [ email,setEmail ] = useState('');
    const [ password,setPassword ] = useState('');
    const [ repassword,setRepassword] = useState('');
    const { register, handleSubmit,formState:{errors},watch } = useForm({
        defaultValues:{
            email: '',
            password: '',
            repassword: '',
        },
        mode: 'onTouched'
    });
    // const watchEmail = watch("email");
    // const watchCode = watch("password");
    const api = 'http://34.125.232.84:3000';
    const onSubmit = async(data)=>{
        const formData={
            email:data.email,
            password:data.password,
            passwordCheck:data.repassword,
            name:data.email.split('@')[0],
        }
        //console.log(formData);
        const signupRes = await axios.post(`${api}/signup`,formData
        ).then(res=>{
            console.log(res.data);
            setMode('login');
            Swal.fire({
            title: 'Success',
            text: '註冊成功！您現在可以登入了',
            icon: 'success',
            confirmButtonText: '確定'
      });
        }).catch(err=>{
            console.log(err);
            const errorMessage= err.message;
            Swal.fire({
            title: 'Fail',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: '確定'
      });
        })
    }
    const apiLoginSubmit = async ()=>{
        const loginData= {
            "email": email,
            "password":password,
        }  

        const loginRes = await axios.post(`${api}/signin`,
        loginData).then(res=>{
            localStorage.setItem("password",password);
            console.log(res.data);
            return res.data;
        }).catch(err=>{
            console.log(err);
        })
        //console.log(loginRes);
        const token = loginRes.data.token;
        const id = loginRes.data.id;
        const isTeacher = loginRes.data.isTeacher;
        console.log(isTeacher);
        // fake data
        console.log(token);
        localStorage.setItem("token",loginRes.data.token);
        localStorage.setItem("islogin",true);
        localStorage.setItem("user_id",loginRes.data.id);
        localStorage.setItem("isTeacher",isTeacher);
        localStorage.setItem("changeMode","teacher");
        //handle Login 
        if(token){
            onNavbar(id,isTeacher);
        }   
        //close modal
        Swal.fire({
        title: 'Success',
        text: '登入成功！',
        icon: 'success',
        confirmButtonText: '確定'
      });
        closeLoginModal();
    }

    const handleClose = () =>{
        setEmail('');
        setPassword('');
        closeLoginModal();
    }
    return(
        <div className="modal fade" id="login_Modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="login_modal_content modal-content">
            <div className="modal-header border-primary">
                <h5 className="modal-title" id="exampleModalLabel"></h5>
                <button type="button" className="close-btn close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="login-container">
                    <div className="button-list">
                        <button className={`btn mode-btn-1 ${mode==="signup" ? ('mode-active'):('')}`} onClick={()=>{setMode("signup")}}>註冊</button>
                        <button className={`btn mode-btn ${mode==="login" ? ('mode-active'):('')}`} onClick={()=>{setMode("login")}}>登入</button>
                    </div>
                    {
                    mode==="signup" && (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-10px">使用帳號密碼註冊</div>
                            <div className="input-bar mb-10px">
                                <label className={`form-control input-login-label ${errors.email && 'is-wrong'}`}>帳號</label>
                                <input  className={`form-control input-login-right  ${errors.email && 'is-invalid'} `} {...register("email",{
                                required:{value: true, message:'Email必填'},
                                maxLegnth: 40,
                                pattern: /^\S+@\S+$/i
                                })}  placeholder="請輸入信箱"/>
                            </div>
                            <div className="input-bar mb-10px">
                                <label  className={`form-control input-login-label ${errors.password && 'is-wrong'}`}>密碼</label>
                                <input type="password" className={`form-control input-login-right ${errors.password && 'is-invalid'}`} {...register("password",{required: true , maxLegnth: 20})}  placeholder="請輸入密碼"/>
                            </div>
                            <div className="input-bar mb-10px">
                                <label className={`form-control input-login-label ${errors.repassword && 'is-wrong'}`}>確認</label>
                                <input  type="password" className={`form-control input-login-right ${errors.repassword && 'is-invalid'}`} {...register("repassword",{required: true , maxLegnth: 20})}  placeholder="請再次輸入密碼"/>
                            </div>
                            <button className="btn btn-primary w-100 mb-20px"  type="submit">
                                註冊
                            </button>
                            <div className="mb-10px">使用其他方式註冊</div>
                            <div className="button-container d-flex">
                            <button className="btn" style={{border:'1px solid var(--main-blue25)'}}>
                                <img className="icon" src={icon_google}></img>
                                google帳戶
                            </button>
                            <button className="btn" style={{border:'1px solid var(--main-blue25)'}}>
                                <img className="icon" src={icon_fb}></img>
                                Facebook帳戶
                            </button>


                            </div>


                        </form>
                    )
                }
                {
                    mode==="login" && (
                        <>
                        <form>
                            <div className="mb-10px">使用帳號密碼註冊</div>
                            <div className="input-bar mb-10px">
                                <label className={`form-control input-login-label`}>帳號</label>
                                <input  value={email} onChange={(e)=>{setEmail(e.target.value)}}className={`form-control input-login-right   `}  placeholder="請輸入信箱"/>
                            </div>
                            <div className="input-bar mb-10px">
                                <label className={`form-control input-login-label`}>密碼</label>
                                <input  type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}  className={`form-control input-login-right `}   placeholder="請輸入密碼"/>
                            </div>
                            <div className="btn btn-primary w-100 mb-20px" onClick={apiLoginSubmit}>
                                登入
                            </div>
                            <div className="mb-10px">使用其他方式登入</div>
                            <div className="button-container d-flex">
                            <button className="btn" style={{border:'1px solid var(--main-blue25)'}}>
                                <img src={icon_google} className="icon"></img>
                                google帳戶
                            </button>
                            <button className="btn" style={{border:'1px solid var(--main-blue25)'}}>
                                <img src={icon_fb} className="icon"></img>
                                Facebook帳戶
                            </button>
                            </div>



                        </form>
                        </>
                    )
                }

                </div>
            </div>
            <div className="modal-footer">
            </div>
            </div>
        </div>
        </div>
    )
}

export default LoginModal;
LoginModal.propTypes = {
    closeLoginModal: PropTypes.func.isRequired,
    onNavbar: PropTypes.func.isRequired,
}