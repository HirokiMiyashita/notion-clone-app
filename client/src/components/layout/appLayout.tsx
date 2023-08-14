// import React from "react";
import { Outlet, useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { uidState } from "../../atoms/uidAtoms";
import { authUtiles } from "../../utils/authUtils";
import { SideBar } from "../sideBar";

const AppLayout = () => {
  const [uid, setUid] = useRecoilState(uidState);

  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = localStorage.getItem("token");
    if (isLogin === null) {
      navigate("/login");
    }
    const getUsername = async () => {
      const isAuth = await authUtiles.isAuthenticated();
      //   if (!isAuth) {
      //     navigate("/login");
      //   }
      setUid(isAuth.username);
    };
    getUsername();
  }, [navigate]);

  const logaut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const drawerWidth = 240;

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <SideBar uid={uid} logout={logaut} />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* <Memo /> */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
