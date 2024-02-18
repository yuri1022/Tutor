
import Search from './Searchbar'
import PropTypes from 'prop-types';
import headshot01 from './../assets/images/svg/headshot01.svg';
import LogoIcon from '../assets/images/svg/logo.svg'
import { Link } from 'react-router-dom';


const Navbar = ({ searchTerm, onSearchChange }) =>{

  
    return(
            <nav className="Navtop navbar navbar-expand-lg ">
                <div className="d-flex">
                    <Link to = '/'>
                    <img src={LogoIcon} alt="tutor" />
                    </Link>
                    <ul className="navbar-nav ">
                        <li className="nav-item">
                            <Link to = '/apply'>成為老師</Link>
                        </li>
                    </ul>
                </div>
                {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                <div className="NavCollapse" >
                    <div className="navbar-right">
                        <div className="navbar-search">
                        <Search searchTerm={searchTerm} onSearchChange={onSearchChange} />
                        </div>
                        <div className="d-flex">
                            <div><img src={headshot01}/></div>
                            <button className="btn btn-outline-success my-2 my-sm-0" >登出</button>
                        </div>
                    </div>
                </div>
            </nav>  
    )
};

Navbar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default Navbar;