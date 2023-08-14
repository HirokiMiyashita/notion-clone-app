import { Box, Typography } from "@mui/material";
import Picker from "@emoji-mart/react";
import React, { useCallback, useEffect, useState } from "react";

interface EmojiProps {
  icon: string;
  setSelectedEmoji: React.Dispatch<React.SetStateAction<string>>;
  selectedEmoji: string;
  updateIcon: () => Promise<void>;
}

// interface LoginProps {
//     username: string;
//     password: string;
//     setValidate: React.Dispatch<React.SetStateAction<string>>;
//     setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
//     navigate: NavigateFunction;
//   }

export const EmojiPicker = ({
  icon,
  setSelectedEmoji,
  selectedEmoji,
  updateIcon,
}: EmojiProps) => {
  const [isShowPicker, setIsShowPicker] = useState(false);
  const codesArray: any[] = [];
  useEffect(() => {
    setSelectedEmoji(icon);
  }, [icon]);

  const showPicker = useCallback(() => {
    setIsShowPicker((prevState) => !prevState);
  }, []);

  const selectIcon = async (e: any) => {
    const emojiCode = e.unified.split("-");
    emojiCode.map((e: any) => {
      codesArray.push("0x" + e);
    });

    const emoji = String.fromCodePoint(...codesArray);
    setSelectedEmoji(emoji);
    await updateIcon();
    setIsShowPicker(false);
  };

  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight={700}
        onClick={showPicker}
        sx={{ cursor: "pointer" }}
      >
        {selectedEmoji}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? "block" : "none",
          position: "absolute",
          zIndex: "100",
        }}
      >
        <Picker onEmojiSelect={selectIcon} />
      </Box>
    </Box>
  );
};
