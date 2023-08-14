import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./components/layout/authLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AppLayout from "./components/layout/appLayout";
import Memo from "./pages/Memo";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Route>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="memo" element={<Home />} />
          <Route path="memo/:memoId" element={<Memo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
