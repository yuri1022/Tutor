import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import TeachersPage from "./pages/TeachersPage";
import "bootstrap/dist/css/bootstrap.min.css";



function App() {
  return (
  <BrowserRouter>
  <div className="app">
       <Routes>       
          <Route path="user" element={<TeachersPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
    </div>
    </BrowserRouter>



  );
}

export default App;
