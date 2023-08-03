import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./components/layout/authLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
