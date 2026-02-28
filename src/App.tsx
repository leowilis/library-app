import { Routes, Route } from "react-router-dom";
import UserLogin from "./pages/auth/UserLoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/login" element={<UserLogin/>} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}


