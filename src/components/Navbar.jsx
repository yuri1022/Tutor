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
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /
`;

const NavbarContent = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto ;
  grid-column-gap:10px;
  align-items: center;
   & > .title {
    margin-right: 20px;
  }

  & > .userpage {
   margin-right: 50px; 
  }

`;


const Navbar = () => {

  return (
  <NavbarStyle style={{backgroundColor: 'var(--grey-light)'}}>
  <NavbarContent>
  <div className="navbar" style={{width:'100%',color: 'var(--grey-800)',padding:'10px'}}>
    <div className="title" style={{ gridColumn: '1/2' }}>Tutor</div>
    <div className="userpage" style={{ gridColumn: '2/3' }} >Name</div>  
    {/* 這裡要Link至學生頁面 */}
    <StyledLink to="/apply" className="applyteacher" style={{ gridColumn: '3/4' }}>成為老師</StyledLink>
    <div className="logout" style={{ gridColumn: '4/5' }}>Log Out</div>
  </div>
  </NavbarContent>
  </NavbarStyle>
  );
};

export default Navbar;