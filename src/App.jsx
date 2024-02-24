
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import TeachersPage from "./pages/TeachersPage";
import ApplyTeacher from './pages/ApplyTeacher';
import './main.scss'
import Students_profile from './pages/students/Students_profile'
import TeacherSelfPage from './pages/TeacherSelfPage';
import TeacherCollection from './components/TeacherCollection';

function App() {
  return (
  <BrowserRouter>
  <div className="app">
       <Routes>       
          <Route path="teacher/:teacher_id" element={<TeachersPage />} />
          <Route path="teacher/:teacher_id/personal" element={<TeacherSelfPage />} />
          <Route path="teacher/:id" element={<TeacherCollection />} />

          <Route path="student" element={<Students_profile/>} />
          <Route path="home" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
          <Route path="home/:page" element={<HomePage />} />
          <Route path="apply" element={<ApplyTeacher />}/>
        </Routes>
    </div>
    </BrowserRouter>
  );
}
export default App;
