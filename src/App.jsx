import { HashRouter as Router, Route, Routes,useNavigate } from 'react-router-dom';
import { createContext, useState,useReducer,useEffect } from 'react';
import { AuthProvider } from './components/context/AuthContext.jsx';
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import TeachersPage from "./pages/TeachersPage";
import ApplyTeacher from './pages/ApplyTeacher';
import ApplyTeacherFormMobile from './components/applyTeacher/mobile/ApplyTeacherForm.jsx';
import './main.scss';
import Students_profile from './pages/students/Students_profile';
import Students_course from './pages/students/Students_course.jsx';
import TeacherSelfPage from './pages/TeacherSelfPage';
import TeacherCalendarPage from './pages/TeacherCalendarPage.jsx';
import AppReducer from './store/AppContext.js';
import AdminPage from './pages/AdminPage.jsx';
import { TeacherProvider } from './components/context/teachercontext.jsx';


export const AppContext = createContext();

const initial_login = ()=>{
  let data = false;
  if(localStorage.getItem("islogin")===null){
    localStorage.setItem("islogin",false);
    // const local_islogin = localStorage.getItem("islogin");
    // data = local_islogin === 'false' ? false : Boolean(local_islogin);
    data = false;
  }
  if(localStorage.getItem("islogin")===true){
    data = true;
  }
  else{
    data = false;
  }
  return data;
}
function App() {
  const initial_data = {
    logindata : '',
    isTeacher: 0,
    isLogin: false,
    isApply: false,
    isAdmin:false,
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [state, dispatch ] = useReducer( AppReducer,initial_data);

const handleSearchSubmit = (searchTxt) => {
    setSearchTerm(searchTxt);
};
  useEffect(()=>{
    const data =initial_login();
  },[])
  return (
  <AuthProvider>
  <Router>
        <div className="app">
          <AppContext.Provider value={{ searchTerm, state, dispatch }}>
            <Navbar onSearchSubmit={handleSearchSubmit} />
            <TeacherProvider searchTerm={searchTerm}>
              <Routes>
                <Route path="course" element={<TeacherCalendarPage />} />
                <Route path="teacher/:id" element={<TeachersPage />} />
                <Route path="teacher/:id/personal" element={<TeacherSelfPage />} />
                <Route path="student/:id" element={<Students_profile />} />
                <Route path="student/:id/course" element={<Students_course />} />
                <Route path="home/*" element={<HomePage />} />
                <Route path="*" element={<HomePage />} />
                <Route path="apply" element={<ApplyTeacher />} />
                <Route path="apply/apply_teacher_form" element={<ApplyTeacherFormMobile />} />
                <Route path="admin" element={<AdminPage />} />
              </Routes>
            </TeacherProvider>
          </AppContext.Provider>
        </div>
      </Router>
  </AuthProvider>
  );
}
export default App;