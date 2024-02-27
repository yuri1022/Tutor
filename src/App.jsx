
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createContext, useState,useReducer } from 'react';
import { AuthProvider } from './components/AuthContext.jsx';
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar"
import TeachersPage from "./pages/TeachersPage";
import ApplyTeacher from './pages/ApplyTeacher';
import './main.scss'
import Students_profile from './pages/students/Students_profile'
import TeacherSelfPage from './pages/TeacherSelfPage';
export const AppContext = createContext();
import AppReducer from './store/AppContext.js';
function App() {
  const initial_data = {
      logindata: '',
      isLogin: false,
      isTeacher: false,
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [state,dispatch] = useReducer(AppReducer,initial_data);
  const handleSearchChange = (searchTxt) =>{
    setSearchTerm(searchTxt);
  }
  return (
  <AuthProvider>
  <BrowserRouter>
  <div className="app">
    <AppContext.Provider value={{searchTerm,state,dispatch}}>
      <Navbar onSearchChange={handleSearchChange}/>
      <Routes>    
          <Route path="teacher/:id" element={<TeachersPage />} />
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
    </AuthProvider>
  );
}
export default App;
