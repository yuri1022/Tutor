
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createContext, useContext } from 'react';
const AppContext = createContext();
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar"
import TeachersPage from "./pages/TeachersPage";
import ApplyTeacher from './pages/ApplyTeacher';
import './main.scss'
import Students_profile from './pages/students/Students_profile'
import TeacherSelfPage from './pages/TeacherSelfPage';
function App() {
  const data= "1234";
  return (
  <BrowserRouter>
  <div className="app">
    <AppContext.Provider value={{data}}>
      <Navbar/>
      <Routes>       
        <Route path="teacher/:teacher_id" element={<TeachersPage />} />
        <Route path="teacher/:teacher_id/personal" element={<TeacherSelfPage />} />
        <Route path="student" element={<Students_profile/>} />
        <Route path="home" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
        <Route path="home/:page" element={<HomePage />} />
        <Route path="apply" element={<ApplyTeacher />}/>
      </Routes>
    </AppContext.Provider>
  </div>
    </BrowserRouter>
  );
}
export default App;
