import * as Styled from "../style/TextFieldStyled";
import * as ButtonStyled from "../style/ButtonStyled";
import * as LoginStyled from "../style/LoginStyle/loginStyled";
import { useEffect, useState } from "react";
import { login } from "../api/login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [validate, setValidate] = useState("");
  const [password, setPassWord] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    login({
      username: name,
      password: password,
      setValidate: setValidate,
      setIsLoading: setIsLoading,
      navigate: navigate,
    });
  };

  const inputNameChangeValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const inputPassChangeValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassWord(e.target.value);
  return (
    <>
      <h3>Login</h3>
      <Styled.TextField
        type="text"
        placeholder="お名前"
        value={name}
        onChange={inputNameChangeValue}
      />

      <br />
      <LoginStyled.PaddingTop />
      <Styled.TextField
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={inputPassChangeValue}
      />
      <br />
      {validate.length != 0 ? (
        <LoginStyled.LoginFontErrorStyle>
          {validate}
        </LoginStyled.LoginFontErrorStyle>
      ) : null}
      <br />
      <LoginStyled.PaddingTop />

      <ButtonStyled.Button onClick={handleSubmit}>
        {isLoading ? (
          <LoginStyled.Rotate>&lt; 💅🏾 &gt;</LoginStyled.Rotate>
        ) : (
          <LoginStyled.nomalFont>ログイン</LoginStyled.nomalFont>
        )}
      </ButtonStyled.Button>
    </>
  );
};

export default Login;
