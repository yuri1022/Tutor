import { useContext,useEffect } from 'react';
import Navbar from '../components/Navbar';
import TeachersCollection from '../components/TeacherCollection';
import BestStudents from '../components/BestStudents';
import { AppContext } from '../App';
import { TeacherItem } from '../components/TeacherItem';

const HomePage = () => {
  const searchTerm = useContext(AppContext).searchTerm;
  
  useEffect(()=>{
    console.log(searchTerm);
  },[searchTerm])
  return (
  <div className="home-page">

    <div className="form col col-12" style={{display:'flex'}}>


  <div className="form-left col col-9">
    {/* <TeachersCollection searchTerm={searchTerm}/>     */}
  <TeacherItem />
  </div>
  <div className="form-right col col-3">
  
    <BestStudents />

  </div>


    </div>

  </div>
  );
};

export default HomePage;