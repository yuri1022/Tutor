import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
const LoginModal = ({closeLoginModal}) =>{
    const [mode ,setMode] = useState('signup');
    const [ email,setEmail ] = useState('user1@example.com');
    const [ password,setPassword ] = useState('12345678');
    const [ recode,setRedcode] = useState('');
    const { register, handleSubmit,formState:{errors} } = useForm({
        defaultValues:{
            email: '',
            code: '',
            recode: '',
        },
        mode: 'onTouched'
    });
    const api = 'http://34.125.232.84:3000';
    const onSubmit = ()=>{
        
    }
    const apiLoginSubmit = async ()=>{
        const rawData= {
            "email": email,
            "password":password,
        }  

        const loginRes = await axios.post(`${api}/signin`,
        rawData).then(res=>{
            console.log(res.data);
            return res.data;
        }).catch(err=>{
            console.log(err);
        })
        //console.log(loginRes);
        const token = loginRes.data.token;
        console.log(token);
        localStorage.setItem("token",loginRes.data.token);
        closeLoginModal();
    }
    return(

        <div className="modal fade" id="login_Modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="login_modal_content modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel"></h5>
                <button type="button" className="close-btn close" data-dismiss="modal" aria-label="Close" onClick={closeLoginModal}>
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="container">
                    <div className="button-list">
                        <button className="btn mode-btn" onClick={()=>{setMode("signup")}}>註冊</button>
                        <button className="btn mode-btn" onClick={()=>{setMode("login")}}>登入</button>
                    </div>
                </div>
                {
                    mode==="signup" && (
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <div>使用帳號密碼註冊</div>
                        <input className={`form-control  ${errors.email && 'is-invalid'}`} {...register("email",{required: true , maxLegnth: 40})}  placeholder="請輸入信箱"/>
                        <input className={`form-control  ${errors.email && 'is-invalid'}`} {...register("code",{required: true , maxLegnth: 20})}  placeholder="請輸入密碼"/>
                        <input className={`form-control  ${errors.email && 'is-invalid'}`} {...register("recode",{required: true , maxLegnth: 20})}  placeholder="請再次輸入密碼"/>
                        </form>
                    )
                }
                {
                    mode==="login" && (
                        <>
                        <div>使用帳號密碼登入</div>
                        <input  value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="請輸入信箱"/>
                        <input value={password}  onChange={(e)=>{setCode(e.target.value)}}placeholder="請輸入密碼"/>
                        <button  onClick={apiLoginSubmit}>登入</button>
                        </>
                    )
                }
                
            </div>
            <div className="modal-footer">
            </div>
            </div>
        </div>
        </div>
    )
}

export default LoginModal;