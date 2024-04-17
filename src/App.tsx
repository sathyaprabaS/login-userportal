import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import AuthProvider from "./context/AuthContext";
import { paths } from './routes/path';
import Signup from './pages/Signup';
import Logout from './pages/Logout';



function App() {

  return (
    <>
      <BrowserRouter>
      <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path={paths.REGISTER}
              element={<Signup />}
            />
            <Route path={paths.LOGOUT} element={<Logout />} />
          </Routes>
        </AuthProvider>
        </BrowserRouter>
    </>
  );
}

export default App
