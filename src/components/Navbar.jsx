import { useState,useEffect ,useRef } from 'react';
import axios from 'axios';

import Search from './Searchbar'
import PropTypes from 'prop-types';
import headshot01 from './../assets/images/svg/headshot01.svg';
import LogoIcon from '../assets/images/svg/logo.svg';
import searchIcon from '../assets/images/svg/icon_search.svg';
import { Link } from 'react-router-dom';
import LoginModal from './../components/LoginModal';
import { Modal } from 'bootstrap';
const Navbar = (props) =>{
    const [isLogin,setIsLogin] = useState(false);
    const [isHome,setIsHome]= useState(true);
    const [searchTxt, setSearchTxt]= useState('');
    const [userData, setUserData]  = useState('');
    const loginModal = useRef(null);
    const api = 'http://34.125.232.84:3000';
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
    useEffect(()=>{
        loginModal.current = new Modal('#login_Modal',{
            backdrop: 'static'
        });
    },[])
    const handleLogin = (id,isTeacher)=>{
        setIsLogin(true);
        const user_data = getData(id,isTeacher);
    }
    const handleLogout = ()=>{
        setIsLogin(false);
        localStorage.clear();
    }
    const getData = async(id,isTeacher)=>{
        const token = localStorage.getItem('token');
        if(isTeacher){
            const teacherData = await axios.get(`${api}/teacher/${id}`,{
                headers: { Authorization: `Bearer ${token}` }
            }).then((res)=>{
                console.log(res.data);
                setUserData(res.data);
            }).catch(
                err=>{
                    console.log(err);
                }
            )
            return teacherData;
        }
        else{
            const studentData = await axios.get(`${api}/student/${id}`,{
                headers: { Authorization: `Bearer ${token}` }
            }).then((res)=>{
                // console.log(res.data);
                setUserData(res.data);
            }).catch(
                err=>{
                    console.log(err);
                }
            )
            
            return studentData;
        }
    }
    useEffect(()=>{

    },[isLogin])
    return(
        <>
            <LoginModal closeLoginModal={closeLoginModal} onNavbar={handleLogin}></LoginModal>
            <nav className="Navtop navbar navbar-expand-lg ">
                <div className="d-flex ">
                    <Link className="logo-img" to = '/'>
                        <img src={LogoIcon} alt="tutor" />
                    </Link>
                    <ul className="navbar-nav ">
                        <li className="nav-item">
                            <Link className="nav-link" to = '/apply'>成為老師</Link>
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
                            isLogin ? (
                                <div className="d-flex">
                                    <div className="avatar-block"><Link to='/student'><img className="avatar-img" src={userData?.data?.avatar}/></Link></div>
                                    <button className="btn btn-outline-success my-2 my-sm-0" onClick={handleLogout}>登出</button>
                                </div>
                                
                            ):
                            ( 
                                <button  className="btn btn-outline-primary my-2 my-sm-0" onClick={openLoginModal}>登入/註冊</button>
                                )
                        }
                    </div>
                </div>
            </nav> 
        </> 
    )
};


export default Navbar;