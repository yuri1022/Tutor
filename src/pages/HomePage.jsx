import { useContext,useEffect} from 'react';
import Navbar from '../components/Navbar';
import TeachersCollection from '../components/TeacherCollection';
import BestStudents from '../components/BestStudents';
import { AppContext } from '../App';
import { TeacherProvider } from '../components/teachercontext';


const HomePage = () => {
  const searchTerm = useContext(AppContext).searchTerm;

  useEffect(()=>{
    console.log(searchTerm);
  },[searchTerm]);

  return (

  
  <div className="home-page">
      <TeacherProvider>

    <div className="form col col-12" style={{display:'flex'}}>


  <div className="form-left col col-9">
    
    <TeachersCollection searchTerm={searchTerm}/>    

    
  </div>
  <div className="form-right col col-3">
  
    <BestStudents />

  </div>
  </div>
    </TeacherProvider>
  </div>

  );
};

export default HomePage;