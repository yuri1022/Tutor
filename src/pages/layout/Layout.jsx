
import Navbar from './../../components/Navbar'
import {Outlet} from "react-router-dom";
const Layout = () =>{
    <div>
        <Navbar></Navbar>
        {<Outlet></Outlet>}
        
    </div>
}

export default Layout;