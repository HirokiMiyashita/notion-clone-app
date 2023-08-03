import { Outlet } from "react-router-dom";
import NotionLog from "../../assets/notion-logo.png";
import * as Styled from "../../style/LoginStyle/loginStyled";

export const AuthLayout = () => {
  return (
    <Styled.Container>
      <Styled.PaddingTop />
      <Styled.LoginImage src={NotionLog} alt="" />
      <Styled.PaddingTop />
      <Styled.LoginFontStyle>Notion Clone 開発</Styled.LoginFontStyle>
      <Outlet />
    </Styled.Container>
  );
};
