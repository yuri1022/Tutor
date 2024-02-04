
const Navbar = () =>{
    return(
            <nav className="Navtop navbar navbar-expand-lg navbar-light bg-light ">
                <a className="navbar-brand" href="#">Tutor</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="NavCollapse collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Name</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">成為老師</a>
                        </li>
                    </ul>
                    <div>
                        <button className="btn btn-outline-success my-2 my-sm-0" >Log Out</button>
                    </div>
                </div>
            </nav>  
    )
}

export default Navbar;