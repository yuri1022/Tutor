import { useEffect, useState,useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import axios from 'axios';
import icon_google from './../assets/images/svg/icon_google.svg';
import icon_fb from './../assets/images/svg/icon_facebook.svg';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { useAuth } from './AuthContext';
import { AppContext } from '../App';


const LoginModal = ({ show, onHide,handleLoginSuccess }) => {
    const { login,isUserLoggedIn } = useAuth();
    const {state,dispatch} = useContext(AppContext);
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
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

    console.log(errors.email)
    console.log(errors.password)

    const api = 'http://34.125.232.84:3000';

    const handleHide = () => {
        setEmail('');
        setPassword('');
        onHide(); // 关闭模态框
    };
    const onSubmit = async (data) => {
        const formData = {
            email: data.email,
            password: data.password,
            passwordCheck: data.repassword,
            name: data.email.split('@')[0],
        }

        try {
            const signupRes = await axios.post(`${api}/signup`, formData);
            console.log(signupRes.data);
            setMode('login');
            Swal.fire({
                title: 'Success',
                text: '註冊成功！您現在可以登入了',
                icon: 'success',
                confirmButtonText: '確定'
            });
        } catch (err) {
            console.log(err);
            const errorMessage = err.message;
            Swal.fire({
                title: 'Fail',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: '確定'
            });
        }
    }

    const apiLoginSubmit = async () => {
        const loginData = {
            "email": email,
            "password": password,
        }

        try {
            const loginRes = await axios.post(`${api}/signin`, loginData);
            localStorage.setItem("password", password);
            console.log(loginRes.data);
            const token = loginRes.data.data.token;
            const id = loginRes.data.data.id;
            const isTeacher = loginRes.data.data.isTeacher;
            // console.log(isTeacher);
            // console.log(token);
            localStorage.setItem("token", token);
            localStorage.setItem("islogin", true);
            localStorage.setItem("user_id", id);
            localStorage.setItem("isTeacher", isTeacher);
            localStorage.setItem("changeMode", "student");
            localStorage.setItem("userdata", JSON.stringify(loginRes.data));
            login(loginRes.data.data);
            isUserLoggedIn(true);
            Swal.fire({
                title: 'Success',
                text: '登入成功！',
                icon: 'success',
                confirmButtonText: '確定'
            });
            handleLoginSuccess(); 
            onHide();
            
        } catch (err) {
            console.log(err);
        }
    };

    console.log(state)
    return (
        <Modal className="login-container" show={show} onHide={handleHide}>
            <Modal.Header className='modal-header' closeButton>
                <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body className="login_modal_content">
                <div className="login-container" style={{width:'70%'}}>
                    <div className="button-list">
                        <button className={`btn mode-btn-1 ${mode === "signup" ? ('mode-active') : ('')}`} onClick={() => { setMode("signup") }}>註冊</button>
                        <button className={`btn mode-btn ${mode === "login" ? ('mode-active') : ('')}`} onClick={() => { setMode("login") }}>登入</button>
                    </div>
                    {
                        mode === "signup" && (
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-10px">使用帳號密碼註冊</div>
                                <Form.Group className='input-bar d-flex' controlId="formBasicEmail" style={{marginBottom:'10px',border:'1px solid var(--main-blue)',borderRadius:'0.3125rem'}}>
                                    <Form.Label className="d-flex" style={{width:'30%',alignItems:'center',justifyContent:'center',marginBottom:'0',color:'var(--main-blue)'}}>帳號</Form.Label>
                                    <Form.Control className={`form-control input-login-right ${errors.email && 'is-invalid'}`} style={{border:'none',borderRadius:'0 0.3125rem 0.3125rem 0 '}} type="email" {...register("email", {
                                        required: { value: true, message: 'Email必填' },
                                        maxLength: 40,
                                        pattern: /^\S+@\S+$/i
                                    })} placeholder="請輸入信箱" />

                                    {errors?.email?.message.length>0 && 
                                    <div className="email-tooltip-box d-flex">
                                        <Form.Text className="text-danger mt-0">{errors.email.message}</Form.Text>
                                    </div>}
                                </Form.Group>
                                <Form.Group className='input-bar d-flex' controlId="formBasicPassword" style={{marginBottom:'10px',border:'1px solid var(--main-blue)',borderRadius:'0.3125rem'}}>
                                    <Form.Label className="d-flex" style={{width:'30%',alignItems:'center',justifyContent:'center',marginBottom:'0',color:'var(--main-blue)'}}>密碼</Form.Label>
                                    <Form.Control className={`form-control input-login-right ${errors.password && 'is-invalid'}`}
                                    style={{border:'none',borderRadius:'0 0.3125rem 0.3125rem 0 '}} type="password" {...register("password",{ required:{value: true, message:'密碼必填'},
                                maxLength: 20})} placeholder="請輸入密碼" />
                                
                                    {errors?.password?.message && 
                                    <div className="pw-tooltip-box d-flex">
                                    <Form.Text className="text-danger mt-0">{errors.password.message}</Form.Text>
                                    </div>}
                                </Form.Group>
                                <Form.Group className='input-bar d-flex' controlId="formBasicRepassword" style={{marginBottom:'20px',border:'1px solid var(--main-blue)',borderRadius:'0.3125rem'}}>
                                    <Form.Label className="d-flex" style={{width:'30%',alignItems:'center',justifyContent:'center',marginBottom:'0',color:'var(--main-blue)'}}>確認</Form.Label>
                                    <Form.Control className={`form-control input-login-right ${errors.repassword && 'is-invalid'}`} {...register("repassword",{ required:{value: true, message:'確認密碼必填'},
                                maxLength: 20})} style={{border:'none',borderRadius:'0 0.3125rem 0.3125rem 0 '}} type="password"  placeholder="請再次輸入密碼" />
                                     {errors.repassword && (
                              <div className="repw-tooltip-box d-flex">
                                <Form.Text className="text-danger mt-0">{errors.repassword.message}</Form.Text>                
                                </div>
                            )}
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100 mb-20px">
                                    註冊
                                </Button>
                                <div className="mb-10px">使用其他方式註冊</div>
                                <div className="button-container d-flex" style={{marginBottom:'10px'}}>
                                    <button className="btn" style={{ border: '1px solid var(--main-blue25)' }}>
                                        <img className="icon" src={icon_google}></img>
                                        google帳戶
                                    </button>
                                    <button className="btn" style={{ border: '1px solid var(--main-blue25)' }}>
                                        <img className="icon" src={icon_fb}></img>
                                        Facebook帳戶
                                    </button>
                                </div>
                            </Form>
                        )
                    }
                    {
                        mode === "login" && (
                            <Form onSubmit={handleSubmit(apiLoginSubmit)}>
                                <div className="mb-10px">使用帳號密碼登入</div>
                                <Form.Group className='d-flex' controlId="formBasicLoginEmail" style={{marginBottom:'10px',border:'1px solid var(--main-blue)',borderRadius:'0.3125rem'}}>
                                    <Form.Label className="d-flex" style={{width:'30%',alignItems:'center',justifyContent:'center',marginBottom:'0',color:'var(--main-blue)'}}>帳號</Form.Label>
                                    <Form.Control className={`form-control input-login-right ${errors.email && 'is-invalid'}`} style={{border:'none',borderRadius:'0 0.3125rem 0.3125rem 0 '}} 
                                    {...register("email", {
                                        required: { value: true, message: 'Email必填' },
                                        maxLength: 40,
                                        pattern: /^\S+@\S+$/i
                                    })} 
                                    type="email" value={email} 
                                    onChange={(e) => { setEmail(e.target.value) }} 
                                    placeholder="請輸入信箱" />
                                    {errors?.email?.message && 
                                    <div className="email-tooltip-box d-flex">
                                    <Form.Text className="text-danger mt-0">{errors.email.message}</Form.Text>
                                    </div>}
                                </Form.Group>
                                <Form.Group className='d-flex' controlId="formBasicLoginPassword" style={{marginBottom:'20px',border:'1px solid var(--main-blue)',borderRadius:'0.3125rem'}}>
                                    <Form.Label className="d-flex" style={{width:'30%',alignItems:'center',justifyContent:'center',marginBottom:'0',color:'var(--main-blue)'}}>密碼</Form.Label>
                                    <Form.Control className={`form-control input-login-right ${errors.password && 'is-invalid'}`} type="password" style={{border:'none',borderRadius:'0 0.3125rem 0.3125rem 0 '}}{...register("password",{ required:{value: true, message:'密碼必填'},
                                maxLength: 20})} value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="請輸入密碼" />
                                    {errors?.password?.message && 
                                    <div className="pw-tooltip-box d-flex">
                                    <Form.Text className="text-danger mt-0">{errors.password.message}</Form.Text>
                                    </div>}
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100 mb-20px">
                                    登入
                                </Button>
                                <div className="mb-10px">使用其他方式登入</div>
                                <div className="button-container d-flex">
                                    <button className="btn" style={{ border: '1px solid var(--main-blue25)' }}>
                                        <img src={icon_google} className="icon"></img>
                                        google帳戶
                                    </button>
                                    <button className="btn" style={{ border: '1px solid var(--main-blue25)' }}>
                                        <img src={icon_fb} className="icon"></img>
                                        Facebook帳戶
                                    </button>
                                </div>
                            </Form>
                        )
                    }
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default LoginModal;