import { useState,useEffect ,useRef,useContext,useReducer } from 'react';
import { useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import DefaultImg from '../assets/images/svg/defaultimg.svg';
import LogoIcon from '../assets/images/svg/logo.svg';
import searchIcon from '../assets/images/svg/icon_search.svg';
import { Link } from 'react-router-dom';
import LoginModal from './../components/LoginModal';
import { Modal } from 'bootstrap';
import AppReducer from '../store/AppContext';
import { AppContext } from '../App';
import { Dropdown } from 'react-bootstrap';
import '../assets/scss/navbar.scss';
import { useAuth } from './context/AuthContext';
import Swal from 'sweetalert2';
import { getTeacher } from '../api/teacher';
import { get_student_data } from '../api/student';
import { getAdminUsers } from '../api/admin';

const Navbar = (props) =>{
    const [ isOpen,setIsOpen] = useState(false);
    const [searchTxt, setSearchTxt]= useState('');
    const {state,dispatch} = useContext(AppContext);
    const { isUserLoggedIn } = useAuth();
    const loginModal = useRef(null);
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id")
    const openLoginModal = () =>{
        setIsOpen(true);
        loginModal.current.show();
    }
    const closeLoginModal = ()=>{
        setIsOpen(false);
        loginModal.current.hide();
    }
    const handleSearch = () =>{
        console.log(searchTxt);
        props.onSearchSubmit(searchTxt);
    }
    const handleGotoApply = ()=>{
        if(localStorage.getItem("islogin") === false){
            console.log("You need to login");
        }
        else{
            localStorage.setItem('isHome',"false");
            dispatch({type:"APPLYTEACHER"});
            navigate('/apply');

        }
    }
    const handleGooutApply =()=>{
        dispatch({type:'APPLYTEACHER_BACK'});
    }

    console.log('STATE',state)
    const handleLogin = (id,isTeacher)=>{
        const user_data = getData(id,isTeacher);
    }
    const handleLogout = ()=>{
        localStorage.clear();
        localStorage.setItem("islogin",false);
        localStorage.setItem("isHome","true");
        navigate('/');
        Swal.fire({
            title: 'Success',
            text: '您已成功登出!',
            icon: 'success',
            confirmButtonText: '確定'
        })
    }
    const getOut_homepage=()=>{
        localStorage.setItem('isHome',"false");
    }
    const apply_to_homepage = ()=>{
        localStorage.setItem('isHome',"true");
        dispatch({type:"APPLYTEACHER_BACK"});
    }

   const getData = async (id, isTeacher) => {
    try {
        let userData;
        if (isTeacher === 1) {
            userData = await getTeacher(id);
        } else if (isTeacher === 0) {
            userData = await get_student_data(id);
        } else if (isTeacher === undefined) {
            userData = await getAdminUsers();
            navigate('/admin');
        }
        
        if (userData) {
            dispatch({
                type: "LOGIN",
                payload: {
                    logindata: userData.data,
                    isAdmin: isTeacher === undefined,
                    isTeacher: isTeacher === 1,
                    isLogin: true
                }
            });
            localStorage.setItem('userdata', JSON.stringify(userData.data));
            return userData;
        }
    } catch (error) {
        console.log(error);
    }
}
        

    useEffect(()=>{
        loginModal.current = new Modal('#login_Modal',{
            backdrop: true
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
        if(isUserLoggedIn){
            getUpdate()
        }
    },[localStorage.getItem("islogin")])

    const handleModeChange = (mode) => {
     localStorage.setItem('changeMode', mode);
    };
    console.log(localStorage.getItem("user_id"))

    return(
        <>
        {
            state.isApply ?
            (<div className="apply-Nav">
                <Link className="topbar d-flex flex-row-reverse" to = '/' onClick={()=>{apply_to_homepage ()}}>
                    Ｘ
                </Link>
            </div>
            ):
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

                                    (parseInt(localStorage.getItem("isTeacher"))===1 && state.isApply===false && localStorage.getItem("changeMode")==="teacher") &&
                                    (<Link className="nav-link" to={`/student/${userId}`} onClick={() => handleModeChange('student')}>切換回學生頁面</Link>
)

          
                                }
                                {
                                    (parseInt(localStorage.getItem("isTeacher"))===1 && localStorage.getItem("changeMode")==="student") &&

                                    (<Link className="nav-link" to={`/teacher/${userId}/personal`} onClick={() => handleModeChange('teacher')}>切換回老師頁面</Link>)

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

                            { (localStorage.getItem('isHome')==="true" && (localStorage.getItem('isAdmin'))==="false" && localStorage.getItem("islogin")==="true") ?
                            ( 
                            <div className="navbar-search">
                                <input  id="search" className="form-control " placeholder="請輸入要查詢的課程" aria-label="Search" onChange={(e)=>{setSearchTxt(e.target.value)}}/>
                                <img className="search-icon" src={searchIcon} onClick={handleSearch}>
                                </img>
                            </div>)
                            :
                            (<div></div>)
                            }

                            {
                        localStorage.getItem("islogin")==="true" ? (
                            <Dropdown >
                            <Dropdown.Toggle style={{background:'transparent',border:'none'}}>
                            <img className="avatar-img" style={{objectFit:'cover'}} src={JSON.parse(localStorage.getItem("userdata"))?.avatar && JSON.parse(localStorage.getItem("userdata"))?.avatar.length>0 ? JSON.parse(localStorage.getItem("userdata")).avatar:DefaultImg} onError={(e) => { e.target.src = DefaultImg }}/>
                            </Dropdown.Toggle>
                            {(localStorage.getItem('isAdmin'))==="true" ? 
                            (                           
                            <Dropdown.Menu>
                            <Dropdown.Item href="#" onClick={()=>{handleLogout()}}>登出</Dropdown.Item>
                            </Dropdown.Menu>
                            ):
                            
                            ( 
                                (localStorage.getItem("isTeacher")) == 1 && localStorage.getItem("changeMode")==="teacher" ?
                            (    
                            <Dropdown.Menu>
                            <Dropdown.Item >
                            <Link to={`/teacher/${userId}/personal`} onClick={getOut_homepage}>個人檔案</Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                            <Link to={`/course`} onClick={getOut_homepage}>我的課程</Link>
                            </Dropdown.Item>
                            <Dropdown.Item href="#" onClick={()=>{handleLogout()}}>登出</Dropdown.Item>
                            </Dropdown.Menu>
                            ):
                            
                            (                            
                            <Dropdown.Menu>
                            <Dropdown.Item>
                            <Link to={`student/${userId}`} onClick={getOut_homepage}>個人檔案</Link></Dropdown.Item>
                            <Dropdown.Item className="item-mb-only">
                            <Link to={`student/${userId}/course`} onClick={getOut_homepage}>我的課程</Link>
                            </Dropdown.Item>
                            <Dropdown.Item href="#" onClick={()=>{handleLogout()}}>登出</Dropdown.Item>
                            </Dropdown.Menu>
                            )
                            
                            )}
                           
                            </Dropdown>   

                        
                            
                                    
                                ):
                                ( 
                                    <button className={`navbar-login btn btn-outline-primary my-2 my-sm-0 ${isOpen ? ('active'):('')}`} onClick={openLoginModal}>登入/註冊</button>
                                    )
                            }
                        </div>
                    </div>
                    </div>


                </nav> 
                {
                    (localStorage.getItem('isHome')==='true'&& localStorage.getItem("islogin")==="true" && state.isAdmin===false)  && (                    
                    <div className="searchbar-out">
                    <div className="navbar-search">
                        <input  id="search" className="form-control " placeholder="請輸入要查詢的課程" aria-label="Search" onChange={(e)=>{setSearchTxt(e.target.value)}}/>
                        <img className="search-icon" src={searchIcon} onClick={handleSearch}>
                        </img>
                    </div>
                </div>)
                }

                </>
            )
        }
        </> 
    )
};


export default Navbar;