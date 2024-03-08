import { useContext,useEffect} from 'react';
import TeachersCollection from '../components/TeacherCollection';
import BestStudents from '../components/BestStudents';
import { AppContext } from '../App';
import { TeacherProvider } from '../components/teachercontext';
import { CourseProvider } from '../components/coursecontext';
import '../assets/scss/home.scss'


const HomePage = () => {
  const searchTerm = useContext(AppContext).searchTerm;

  useEffect(()=>{
    console.log(searchTerm);
  },[searchTerm]);

  return (

  
  <div className="home-page d-flex">
      <TeacherProvider>
      
    <div className="form col col-12 d-flex" >


  <div className="form-left col-12 col-md-9 col-lg-9 d-flex">
    
    <TeachersCollection searchTerm={searchTerm}/>    

    
  </div>
  <div className="form-right col-12 col-md-3 col-lg-3">
    <BestStudents />
  </div>
  </div>
    </TeacherProvider>
  </div>

  );
};

export default HomePage;