import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { memoApi } from "../api/memoApi";
import { useRecoilState } from "recoil";
import { memoState } from "../atoms/memoAtoms";

interface SideBarProps {
  uid: string;
  logout: React.MouseEventHandler<HTMLDivElement>;
}

export const SideBar = ({ uid, logout }: SideBarProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [memos, setMemos] = useRecoilState(memoState);
  const navigate = useNavigate();
  const { memoId } = useParams();

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getMemosAll();
        setMemos(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMemos();
  }, [navigate]);

  useEffect(() => {
    const activeIndex = memos.findIndex((e: any) => e._id === memoId);
    setActiveIndex(activeIndex);
  }, [navigate]);

  const addMemo = async () => {
    try {
      const res = await memoApi.createMemo();
      console.log(res);
      navigate(`/memo/${res.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={{ overflow: "auto" }}>
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemText primary={uid} />
            <ListItemIcon onClick={logout}>
              <LogoutIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>

      <List>
        <ListItem>
          <ListItemButton>
            <ListItemText primary={"プライベート"} />
            <ListItemIcon onClick={addMemo}>
              <AddCircleIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>

      <List>
        {memos.map((item: any, index) => (
          <ListItem key={item._id}>
            <ListItemButton
              to={"/memo/" + item._id}
              component={Link}
              selected={index === activeIndex}
              sx={{ backgroundColor: index === activeIndex ? "red" : null }}
            >
              <ListItemIcon onClick={logout}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
