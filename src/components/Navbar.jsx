import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '../main.scss'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: #555;
  }
`;

const NavbarStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 20px; 
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); 
`;

const NavbarContent = styled.div`
  display: flex;
  justify-content:space-between;

`;


const Navbar = () => {

  return (
  <NavbarStyle style={{backgroundColor: 'var(--grey-light)'}}>
  <NavbarContent>
  <div className="navbar" style={{color: 'var(--grey-800)',padding:'10px',width:'100%'}}>
    <div className="title" style={{  fontSize: '24px', marginRight: '20px'}}>Tutor</div>
    <div className="userpage" style={{  fontSize: '24px', marginRight: '20px'}} >Name</div>  
    {/* 這裡要Link至學生頁面 */}
    <StyledLink to="/apply" className="applyteacher" style={{  fontSize: '24px', marginRight: '20px'}}>成為老師</StyledLink>
    <div className="logout" style={{fontSize: '24px',
    marginLeft: 'auto' }}>Log Out</div>
  </div>
  </NavbarContent>
  </NavbarStyle>
  );
};

export default Navbar;