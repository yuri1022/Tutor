import { useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import icon_google from './../assets/images/svg/icon_google.svg';
import icon_fb from './../assets/images/svg/icon_facebook.svg';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { createAccount,handleLogin } from '../api/auth';
import '../assets/scss/login.scss';
import axios from 'axios';

const baseUrl = 'https://ec2-13-231-143-123.ap-northeast-1.compute.amazonaws.com/api';
const clientId = '952647805381-un6tfl6m1sl17cdm3t0j5nuh444u4rum.apps.googleusercontent.com';

const LoginModal = ({show,closeLoginModal,onNavbar}) =>{
    const [mode ,setMode] = useState('login');
    const [ email,setEmail ] = useState('');
    const [ password,setPassword ] = useState('');
    const [ repassword,setRepassword] = useState('');
    const { register, handleSubmit,formState:{errors},watch } = useForm({
        defaultValues:{
            email: '',
            password: '',
            repassword: '',
        },
        mode: 'onTouched',
         errorMessage: {
        email: {
            required: 'Email必填',
        },
        password: {
            required: '密碼必填',
        },
        repassword: {
            required: '確認密碼必填',
        },
    },
    });

     useEffect(() => {
    // Load the Google API script
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api:client.js';
    script.onload = initGoogleSignIn;
    document.body.appendChild(script);
  }, []);
  const initGoogleSignIn = () => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: clientId
      }).then(auth2 => {
        document.getElementById('googleSignInButton').addEventListener('click', () => {
          auth2.signIn().then(googleUser => {
            const id_token = googleUser.getAuthResponse().id_token;
            sendTokenToServer(id_token);
          }).catch(error => {
            console.error('Error signing in', error);
          });
        });
      }).catch(error => {
        console.error('Error initializing Google Auth', error);
      });
    });
  };
 const sendTokenToServer = async (id_token) => {
    try {
      const response = await axios.post(`${baseUrl}/oauth/google`, { token: id_token });
      console.log('User authenticated', response.data);
    } catch (error) {
      console.error('Error sending token to server', error);
    }
  };

  const handleGoogleLogin = () => {
  if (window.gapi && window.gapi.auth2) {
    window.gapi.auth2.getAuthInstance().signIn().then(googleUser => {
      const id_token = googleUser.getAuthResponse().id_token;
      sendTokenToServer(id_token);
    }).catch(error => {
      console.error('Error signing in', error);
    });
  } else {
    window.onload = initGoogleSignIn;
  }
};

const onSubmit = async (data) => {
    
  try {
    const formData = {
      email: data.email,
      password: data.password,
      passwordCheck: data.repassword,
      name: data.email.split('@')[0],
    };
    console.log(formData)
    const signupRes = await createAccount(formData);
    console.log(signupRes.data);
    setMode('login');
    Swal.fire({
      title: 'Success',
      text: '註冊成功！您現在可以登入了',
      icon: 'success',
      confirmButtonText: '確定',
    });
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: 'Fail',
      text: error,
      icon: 'error',
      confirmButtonText: '確定',
    });
  }
};
    const apiLoginSubmit = async (loginData)=>{
        try{
        const loginRes = await handleLogin(email,password)
            localStorage.setItem("password",password);
            const token = loginRes.data.token;
            const id = loginRes.data.id;
            const isTeacher = loginRes.data.isTeacher;
        localStorage.setItem("token",loginRes.data.token);
        localStorage.setItem("islogin",true);
        localStorage.setItem("user_id",loginRes.data.id);
        localStorage.setItem("isTeacher",isTeacher);
        localStorage.setItem("changeMode","student");
        localStorage.setItem("isAdmin",isTeacher===undefined);

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
        return loginRes.data;

        }catch(err){
        const errorMessage= err.response.data.message;
          Swal.fire({
            title: 'Fail',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: '確定'
            });
        }
   
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
                        <button className={`btn mode-btn-1 ${mode==="login" ? ('mode-active'):('')}`} style={{boxShadow:'none'}}onClick={()=>{setMode("login")}}>登入</button>
                        <button className={`btn mode-btn ${mode==="signup" ? ('mode-active'):('')}`} style={{boxShadow:'none'}} onClick={()=>{setMode("signup")}}>註冊</button>

                    </div>
                    {
                    mode==="signup" && (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-10px">使用帳號密碼註冊</div>
                            <div className="input-bar mb-10px">
                                <label className={`form-control input-login-label ${errors.email && 'is-wrong'}`}>帳號</label>
                                <input className={`form-control input-login-right  ${errors.email && 'is-invalid'} `} {...register("email",{
                                required:{value: true, message:'Email必填'},
                                maxLength: 40,
                                pattern: /^\S+@\S+$/i
                                })}  placeholder="請輸入信箱"/>
                            {errors?.email?.message && (
                              <div className="email-tooltip-box d-flex">
                                  {errors.email.message}
                                </div>
                            )}
                            </div>
                            <div className="input-bar mb-10px">
                                <label className={`form-control input-login-label ${errors.password && 'is-wrong'}`}>密碼</label>
                                <input type="password" className={`form-control input-login-right ${errors.password && 'is-invalid'}`} {...register("password",{ required:{value: true, message:'密碼必填'},
                                maxLength: 20})}  placeholder="請輸入密碼"/>
                            {errors.password && (
                              <div className="pw-tooltip-box d-flex">
                                  {errors.password.message}
                                </div>
                            )}
                            </div>
                            <div className="input-bar mb-10px">
                                <label className={`form-control input-login-label ${errors.repassword && 'is-wrong'}`}>確認</label>
                                <input type="password" className={`form-control input-login-right ${errors.repassword && 'is-invalid'}`} {...register("repassword",{ required:{value: true, message:'確認密碼必填'},
                                maxLength: 20})}  placeholder="請再次輸入密碼"/>
                            {errors.repassword && (
                              <div className="repw-tooltip-box d-flex">
                                  {errors.repassword.message}
                                </div>
                            )}

                            </div>
                            <button className="btn btn-primary w-100 mb-20px" type="submit" style={{borderRadius:'0.625rem',backgroundColor:'var(--main-blue)'}}>
                                註冊
                            </button>
                            <div className="mb-10px">使用其他方式註冊</div>
                            <div className="button-container d-flex">
                            <button className="btn"  onClick={handleGoogleLogin} style={{border:'1px solid var(--main-blue25)'}}>
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
                         <form onSubmit={handleSubmit(apiLoginSubmit)}>
                            <div className="mb-10px">使用帳號密碼登入</div>
                            <div className="input-bar mb-10px">
                                <label className={`form-control input-login-label`}>帳號</label>
                                <input className={`form-control input-login-right ${errors.email && 'is-invalid'} `} {...register("email",{required:{value: true, message:'Email必填'},
                                maxLength: 40,
                                pattern: /^\S+@\S+$/i
                                })}
                                value={email} 
                                onChange={(e)=>{setEmail(e.target.value)}} 
                                placeholder="請輸入信箱"/>
                                 {errors?.email?.message && (
                              <div className="email-tooltip-box d-flex">
                                  {errors.email.message}
                                </div>
                            )}
                            </div>
                            <div className="input-bar mb-10px">
                                <label className={`form-control input-login-label`}>密碼</label>
                                <input type="password" className={`form-control input-login-right ${errors.password && 'is-invalid'}`} value={password}  
                                {...register("password",{ required:{value: true, message:'密碼必填'},
                                maxLength: 20})}
                                onChange={(e)=>{setPassword(e.target.value)}} placeholder="請輸入密碼"/>
                
                            {errors.password && (
                              <div className="pw-tooltip-box d-flex">
                                  {errors.password.message}
                                </div>
                            )}

                            </div>
                            <button className="btn btn-primary w-100 mb-20px" type="submit" style={{borderRadius:'0.625rem',backgroundColor:'var(--main-blue)'}}>
                                登入
                            </button>
                            <div className="mb-10px">使用其他方式登入</div>
                            <div className="button-container d-flex">
                            <button className="btn"  onClick={handleGoogleLogin} style={{border:'1px solid var(--main-blue25)'}}>
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