import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from "./pages/Admin";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UserPage from "./pages/UserPage";


function App() {
  return (
  <BrowserRouter>
  <div className="app">
       <Routes>        
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
    </div>
    </BrowserRouter>



  );
}

export default App;
