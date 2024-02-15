
import { useState , useEffect} from 'react';

import headshot01 from './../assets/images/svg/headshot01.svg';
const Navbar = () =>{
    const [searchText,setSearchText] = useState("");
    return(
            <nav className="Navtop navbar navbar-expand-lg ">
                <div className="d-flex">
                    <a className="navbar-brand" href="#">Tutor</a>
                    <ul className="navbar-nav ">
                        <li className="nav-item">
                            <a className="nav-link" href="#">成為老師</a>
                        </li>
                    </ul>
                </div>
                {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                <div className="NavCollapse" >
                    <div className="navbar-right">
                        <div className="navbar-search">
                            <input  onChange={(e)=>{setSearchText(e.target.value)}}className="form-control" type="text" value={searchText} placeholder="搜尋"/>
                        </div>
                        <div className="d-flex">
                            <div><img src={headshot01}/></div>
                            <button className="btn btn-outline-success my-2 my-sm-0" >登出</button>
                        </div>
                    </div>
                </div>
            </nav>  
    )
}

export default Navbar;