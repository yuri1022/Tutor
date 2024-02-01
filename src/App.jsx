import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import TeachersPage from "./pages/TeachersPage";
import ApplyTeacher from './pages/ApplyTeacher';
import './main.scss'



function App() {
  return (
  <BrowserRouter>
  <div className="app">
       <Routes>       
          <Route path="user/:id" element={<TeachersPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
          <Route path="apply" element={<ApplyTeacher />}/>
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
