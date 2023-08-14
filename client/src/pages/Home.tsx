// import React from "react";
import * as HomeStyled from "../style/HomeStyle/HomeStyled";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useEffect, useState } from "react";
import { authUtiles } from "../utils/authUtils";
import { useRecoilState } from "recoil";
import { uidState } from "../atoms/uidAtoms";
import Memo from "./Memo";
import { LoadngBotton } from "../components/LoadngBotton";
import { memoApi } from "../api/memoApi";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const hundleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await memoApi.createMemo();
      navigate(`/memo/${res.data._id}`);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box>
      <LoadngBotton
        handleSubmit={hundleSubmit}
        isLoading={isLoading}
        text="最初のメモを作成"
      ></LoadngBotton>
    </Box>
  );
};

export default Home;
