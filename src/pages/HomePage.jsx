import { useState } from 'react';
import Navbar from '../components/Navbar';
import TeachersCollection from '../components/TeacherCollection';
import BestStudents from '../components/BestStudents';


const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (searchtext) => {
    setSearchTerm(searchtext);

  };
  return (
  <div className="home-page">

    <div className='nav-bar'>
    <Navbar searchTerm={searchTerm} onSearchChange={handleSearchChange}/>
    </div>

    <div className="form col col-12" style={{display:'flex'}}>

    <div className="form-left col col-9">
      <TeachersCollection searchTerm={searchTerm}/>    
    
    </div>
    <div className="form-right col col-3">
    <div className="best-students">
      <BestStudents />
    </div>
    </div>

    </div>

  </div>
  );
};

export default HomePage;
