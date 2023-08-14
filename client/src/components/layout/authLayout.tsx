import { Outlet, useNavigate } from "react-router-dom";
import NotionLog from "../../assets/notion-logo.png";
import * as Styled from "../../style/LoginStyle/loginStyled";
import { useEffect } from "react";
import { authUtiles } from "../../utils/authUtils";
import { useRecoilState } from "recoil";
import { uidState } from "../../atoms/uidAtoms";

export const AuthLayout = () => {
  const navigate = useNavigate();
  const [uid, setUid] = useRecoilState(uidState);

  useEffect(() => {
    const checkAuth = async () => {
      //認証チェック
      const isAuth = await authUtiles.isAuthenticated();
      if (isAuth) {
        setUid(isAuth.username);
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);
  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.PaddingTop />
        <Styled.LoginImage src={NotionLog} alt="" />
        <Styled.PaddingTop />
        <Styled.LoginFontStyle>Notion Clone 開発</Styled.LoginFontStyle>
      </Styled.Header>
      <Outlet />
    </Styled.Container>
  );
};
