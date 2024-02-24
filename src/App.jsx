
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import TeachersPage from "./pages/TeachersPage";
import ApplyTeacher from './pages/ApplyTeacher';
import './main.scss'
import Students_profile from './pages/students/Students_profile'
import TeacherSelfPage from './pages/TeacherSelfPage';
import { AuthProvider } from './components/AuthContext.jsx';
import LoginModal from './components/LoginModal.jsx';


function App() {
  

  return (
    <AuthProvider>
  <BrowserRouter>
  <div className="app">
       <Routes>   
          <Route path="signin" element={<LoginModal />} />    
          <Route path="teacher/:id" element={<TeachersPage />} />
          <Route path="teacher/:teacher_id/personal" element={<TeacherSelfPage />} />
          <Route path="student" element={<Students_profile/>} />
          <Route path="home" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
          <Route path="home/:page" element={<HomePage />} />
          <Route path="apply" element={<ApplyTeacher />}/>
        </Routes>
    </div>
    </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
