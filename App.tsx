import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./src/pages/LoginPage";
import AuthProvider from "./src/context/AuthContext";
import { paths } from "./src/routes/path";
import Signup from "./src/pages/Signup";
import Logout from "./src/pages/Logout";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path={paths.REGISTER} element={<Signup />} />
            <Route path={paths.LOGOUT} element={<Logout />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
