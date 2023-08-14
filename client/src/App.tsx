import { RecoilRoot } from "recoil";
import "./App.css";
import { Router } from "./Router";
import { ThemeProvider, createTheme } from "@mui/material";

function App() {
  const theme = createTheme({
    palette: {
      action: {
        selected: "#bcbcbc", // カスタムの選択時背景色を指定
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
