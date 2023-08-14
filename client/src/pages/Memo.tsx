import { StarBorderOutlined, DeleteOutlineOutlined } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { memoApi } from "../api/memoApi";
import { EmojiPicker } from "../components/EmojiPicker";

interface memoProps {
  descriction: string;
  favorite: boolean;
  favoritePosition: number;
  icon: string;
  position: number;
  title: string;
  user: string;
  __v: number;
  _id: string;
}

function Memo() {
  const { memoId } = useParams();
  const [title, setTitle] = useState("");
  const [descriction, setDescriction] = useState("");
  const [icon, setIcon] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const WAIT_TIME_5_SECONDS = 500;
  let timer: ReturnType<typeof setTimeout>;
  const navigate = useNavigate();
  const updateIcon = async () => {
    try {
      console.log(selectedEmoji);

      const res = await memoApi.updateMemo(memoId, { icon: selectedEmoji });
      console.log(res);
    } catch (error) {}
  };
  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getMemoOne(memoId);
        const data: memoProps = res.data;
        setTitle(data.title);
        setDescriction(data.descriction);
        setIcon(data.icon);
      } catch (error) {
        console.log(error);
      }
    };
    getMemo();
  }, [memoId]);

  const updateTitle = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    clearTimeout(timer);
    setTitle(e.target.value);
    timer = setTimeout(async () => {
      try {
        await memoApi.updateMemo(memoId, { title: title });
      } catch (error) {}
    }, WAIT_TIME_5_SECONDS);
  };

  const updateDescriction = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    clearTimeout(timer);
    setDescriction(e.target.value);
    timer = setTimeout(async () => {
      try {
        await memoApi.updateMemo(memoId, { descriction: descriction });
      } catch (error) {}
    }, WAIT_TIME_5_SECONDS);
  };

  const deleteMemo = async () => {
    try {
      const res = await memoApi.deleteMemo(memoId);
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          width: "100%",
        }}
      >
        <IconButton>
          <StarBorderOutlined />
        </IconButton>
        <IconButton color="error" onClick={deleteMemo}>
          <DeleteOutlineOutlined />
        </IconButton>
      </Box>
      <Box>
        <EmojiPicker
          updateIcon={updateIcon}
          icon={icon}
          setSelectedEmoji={setSelectedEmoji}
          selectedEmoji={selectedEmoji}
        />
        <Box>
          <TextField
            onChange={updateTitle}
            placeholder="無題"
            variant="outlined"
            fullWidth
            value={title}
            sx={{
              ".MuiOutlinedInput-input": { padding: 0 },
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              ".MuiOutlinedInput-root": {
                fontSize: "2rem",
                fontWeight: "bold",
              },
            }}
          />
          <TextField
            placeholder="追加"
            variant="outlined"
            fullWidth
            value={descriction}
            onChange={updateDescriction}
            sx={{
              ".MuiOutlinedInput-input": { padding: 0 },
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              ".MuiOutlinedInput-root": { fontSize: "1rem" },
            }}
          />
        </Box>
      </Box>
    </>
  );
}

export default Memo;
