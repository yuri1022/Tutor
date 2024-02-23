import { useState,useEffect ,useRef } from 'react';

import Search from './Searchbar'
import PropTypes from 'prop-types';
import headshot01 from './../assets/images/svg/headshot01.svg';
import LogoIcon from '../assets/images/svg/logo.svg'
import { Link } from 'react-router-dom';
import LoginModal from './../components/LoginModal';
import { Modal } from 'bootstrap';
const Navbar = ({searchTerm,onSearchChange}) =>{
    const { isLogin,setIsLogin} = useState(false);
    const { isHome,setIsHome} = useState(true);
    const loginModal = useRef(null);
    const openLoginModal = () =>{
        loginModal.current.show();
    }
    const closeLoginModal = ()=>{
        loginModal.current.hide();
    }
    useEffect(()=>{
        loginModal.current = new Modal('#login_Modal',{
            backdrop: 'static'
        });
    },[])
    return(
        <>
            <LoginModal closeLoginModal={closeLoginModal}></LoginModal>
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
                            <input className="form-control mr-sm-2" type="search"  placeholder="請輸入要查詢的課程" aria-label="Search" onChange={(e)=>{onSearchChange(e.target.value)}}/>
                            
                            
                            
                        </div>
                        {
                            isLogin ? (
                                <div className="d-flex">
                                    <div><img src={headshot01}/></div>
                                    <button className="btn btn-outline-success my-2 my-sm-0" >登出</button>
                                </div>
                                
                            ):
                            ( 
                                <button  className="btn btn-outline-success my-2 my-sm-0" onClick={openLoginModal}>登入/註冊</button>
                                )
                        }
                    </div>
                </div>
            </nav> 
        </> 
    )
};

Navbar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default Navbar;