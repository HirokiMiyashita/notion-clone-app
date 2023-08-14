import React, { useState } from "react";
import * as Styled from "../style/TextFieldStyled";
import * as ButtonStyled from "../style/ButtonStyled";
import * as LoginStyled from "../style/LoginStyle/loginStyled";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/register";

const Register = () => {
  const [name, setName] = useState("");
  const [nameValidate, setNameValidate] = useState("");
  const [passValidate, setPassValidate] = useState("");
  const [password, setPassWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    register({
      username: name,
      password: password,
      setNameValidate: setNameValidate,
      setPassValidate: setPassValidate,
      setIsLoading: setIsLoading,
      navigate: navigate,
    });
  };

  const inputNameChangeValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const inputPassChangeValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassWord(e.target.value);
  return (
    <LoginStyled.RegisterContainer>
      <LoginStyled.nomalFont>新規登録</LoginStyled.nomalFont>
      <Styled.TextField
        type="text"
        placeholder="お名前"
        value={name}
        onChange={inputNameChangeValue}
      />
      {nameValidate.length != 0 ? (
        <LoginStyled.LoginFontErrorStyle>
          {nameValidate}
        </LoginStyled.LoginFontErrorStyle>
      ) : null}
      <br />
      <LoginStyled.PaddingTop />
      <Styled.TextField
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={inputPassChangeValue}
      />
      {passValidate.length != 0 ? (
        <LoginStyled.LoginFontErrorStyle>
          {passValidate}
        </LoginStyled.LoginFontErrorStyle>
      ) : null}
      <br />
      <LoginStyled.PaddingTop />

      <ButtonStyled.Button onClick={handleSubmit}>
        {isLoading ? (
          <LoginStyled.Rotate>&lt; 💅🏾 &gt;</LoginStyled.Rotate>
        ) : (
          <LoginStyled.nomalFont>アカウントを作成</LoginStyled.nomalFont>
        )}
      </ButtonStyled.Button>
      <br />
      <Link to={"/login"}>
        <LoginStyled.nomalFont>
          既にアカウントをお持ちの方はこちら
        </LoginStyled.nomalFont>
      </Link>
    </LoginStyled.RegisterContainer>
  );
};
export default Register;
