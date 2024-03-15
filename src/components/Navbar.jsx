import { useState,useEffect ,useRef,useContext,useReducer } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import Search from './Searchbar'
import PropTypes from 'prop-types';
import headshot01 from './../assets/images/svg/headshot01.svg';
import LogoIcon from '../assets/images/svg/logo.svg';
import searchIcon from '../assets/images/svg/icon_search.svg';
import { Link } from 'react-router-dom';
import LoginModal from './../components/LoginModal';
import { Modal } from 'bootstrap';
import AppReducer from '../store/AppContext';
import { AppContext } from '../App';
import { Dropdown } from 'react-bootstrap';
const Navbar = (props) =>{
    const [isHome,setIsHome]= useState(true);
    const [ isTeacher,setIsTeacher] = useState(0);
    const [searchTxt, setSearchTxt]= useState('');
    const {state,dispatch} = useContext(AppContext);
    const loginModal = useRef(null);
    const api = 'http://34.125.232.84:3000';
    const navigate = useNavigate();
    const openLoginModal = () =>{
        loginModal.current.show();
    }
    const closeLoginModal = ()=>{
        loginModal.current.hide();
    }
    const handleSearch = () =>{
        console.log("search");
        props.onSearchChange(searchTxt);
    }
    const handleGotoApply = ()=>{
        if(localStorage.getItem("islogin") === false){
            console.log("You need to login");
        }
        else{
            dispatch({type:"APPLYTEACHER"});
            navigate('/apply');

        }
    }
    const handleGooutApply =()=>{
        dispatch({type:'APPLYTEACHER_BACK'});
    }


    const handleLogin = (id,isTeacher)=>{
        const user_data = getData(id,isTeacher);
    }
    const handleLogout = ()=>{
        localStorage.clear();
        localStorage.setItem("islogin",false);
        navigate('/');

    }
    const apply_to_homepage = ()=>{
        dispatch({type:"APPLYTEACHER_BACK"});
    }
    const getData = async(id,isTeacher)=>{
        const token = localStorage.getItem('token');
        if(isTeacher===1){
            const teacherData = await axios.get(`${api}/teacher/${id}`,{
                headers: { Authorization: `Bearer ${token}` }
            }).then((res)=>{
                // console.log(`teacher data${res.data.data.teachStyle}`);
                localStorage.setItem('userdata',JSON.stringify(res.data));

                dispatch({type:"LOGIN",payload:{logindata:res.data,isTeacher:1,isLogin:true} });
            }).catch(
                err=>{
                    console.log(err);
                }
            )
            console.log(isTeacher);
            return teacherData;
            
        } else if (isTeacher===0) {
            const studentData = await axios.get(`${api}/student/${id}`,{
                headers: { Authorization: `Bearer ${token}` }
            }).then((res)=>{
                // console.log(`student data ${res.data.data.selfIntro}`);
                dispatch({type:"LOGIN",payload:{logindata:res.data,isTeacher:0,isLogin:true} });
                localStorage.setItem('userdata',JSON.stringify(res.data));
            }).catch(
                err=>{
                    console.log(err);
                }
            )
            
            return studentData;
            } else if (isTeacher===undefined){
            const adminData = await axios.get(`${api}/admin/users`,{
                headers: { Authorization: `Bearer ${token}` }
            }).then((res)=>{
                console.log('Admin data' ,res.data);
                const isAdmin = true;  
                dispatch({
                    type:"LOGIN",
                    payload:{logindata:res.data,isAdmin:isAdmin,isLogin:true} 
                });
                
            }).catch(
                err=>{
                    console.log(err);
                }
            )    
        navigate('/admin');    
        }
    }
    useEffect(()=>{
        loginModal.current = new Modal('#login_Modal',{
            backdrop: 'static'
        });
    },[])
    useEffect(()=>{
        const getUpdate = async()=>{
            const userdata = await getData(
                parseInt(localStorage.getItem('user_id')),
                parseInt(localStorage.getItem('isTeacher'))
            );
            console.log(userdata);
        }
        if(localStorage.getItem("islogin")==='true'){
            getUpdate()
        }
    },[])
    useEffect(()=>{

    },[localStorage.getItem("islogin")])
    return(
        <>
        {
            // state.isApply ?
            // (<div className="apply-Nav">
            //     <div className="topbar d-flex flex-row-reverse" onClick={()=>{apply_to_homepage()}}>
            //         X
            //     </div>
            // </div>
            // ):
            (
                <>
                <LoginModal closeLoginModal={closeLoginModal} onNavbar={handleLogin}></LoginModal>
                <nav className="Navtop navbar navbar-expand-xl">
                    <div className="navbar-container d-flex col-12">
                    <div className="d-flex">
                        <Link className="logo-img" to = '/' onClick={()=>{apply_to_homepage ()}}>
                            <img src={LogoIcon} alt="tutor" />
                        </Link>
                        <ul className="navbar-nav d-flex" style={{justifyContent:'center',alignItems:'center'}}>
                            <li className="nav-item">
                                {
                                    (state.isApply===true && localStorage.getItem('isLogin')==="true")&&
                                    (<div></div>)
                                }
                                {
                                    (parseInt(localStorage.getItem("isTeacher"))===1 && state.isApply===false) &&
                                    (<Link className="nav-link" to = '/homepage'>切換回學生頁面</Link>)
          
                                }
                                {
                                    (parseInt(localStorage.getItem("isTeacher"))===1 && localStorage.getItem("changeMode")==="student") &&
                                    (<Link className="nav-link" to = '/homepage'>切換回老師頁面</Link>)
                                }
                                {
                                    (parseInt(localStorage.getItem("isTeacher"))===0 && state.isApply===false) &&
                                    ((<button className={`nav-link  ${ state.logindata ? '':'disabled'}`}  onClick={()=>{handleGotoApply()}}>成為老師</button>))
                                }

                            </li>
                        </ul>
                    </div>
                    <div className="NavCollapse" >
                        <div className="navbar-right">
                            <div className="navbar-search">
                                <input  id="search" className="form-control" placeholder="請輸入要查詢的課程" aria-label="Search" onChange={(e)=>{setSearchTxt(e.target.value)}}/>
                                <img className="search-icon" src={searchIcon} onClick={handleSearch}></img>
                            </div>
                            {
                        localStorage.getItem("islogin")==="true" ? (
                        <div className="d-flex">
                            <Dropdown >
                            <Dropdown.Toggle style={{background:'transparent',border:'none'}}>
                            <img className="avatar-img" src={state.logindata?.data?.avatar}/>
                            </Dropdown.Toggle>
                            {state.isTeacher===1 ?
                            (    
                            <Dropdown.Menu>
                            <Dropdown.Item href={`/teacher/${state.logindata?.data?.id}/personal`}>個人檔案</Dropdown.Item>
                            <Dropdown.Item href={`/course`}>我的課程</Dropdown.Item>
                            <Dropdown.Item href="#" onClick={()=>{handleLogout()}}>登出</Dropdown.Item>
                            </Dropdown.Menu>
                            ):
                            (                            
                            <Dropdown.Menu>
                            <Dropdown.Item href={`/student/${state.logindata?.data?.id}`}>個人檔案</Dropdown.Item>
                            <Dropdown.Item href={`/student/${state.logindata?.data?.id}/course`}>我的課程</Dropdown.Item>
                            <Dropdown.Item href="#" onClick={()=>{handleLogout()}}>登出</Dropdown.Item>
                            </Dropdown.Menu>
                            )}
                            </Dropdown>   

                        {/* <button className="btn btn-outline-success my-2 my-sm-0" >登出</button> */}
                            </div>
                                    
                                ):
                                ( 
                                    <button  className="btn btn-outline-primary my-2 my-sm-0" onClick={openLoginModal}>登入/註冊</button>
                                    )
                            }
                        </div>
                    </div>
                    </div>


                </nav> 
                </>
            )
        }
        </> 
    )
};


export default Navbar;