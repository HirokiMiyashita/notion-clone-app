import React, { useState } from "react";
import * as Styled from "../style/TextFieldStyled";
import * as ButtonStyled from "../style/ButtonStyled";
import * as LoginStyled from "../style/LoginStyle/loginStyled";
import { Link } from "react-router-dom";
import { register } from "../api/register";

const Register = () => {
  const [name, setName] = useState("");
  const [nameValidateFlg, setNameValidateFlg] = useState(true);
  const [password, setPassWord] = useState("");
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    register({ username: name, password: password });
  };

  const inputNameChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (name.length <= 7) {
      setNameValidateFlg(true);
    } else {
      setNameValidateFlg(false);
    }
  };

  const inputPassChangeValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassWord(e.target.value);
  return (
    <>
      <h3>Login</h3>
      <Styled.TextField
        isvalid={nameValidateFlg.valueOf.toString()}
        type="text"
        placeholder="お名前"
        value={name}
        onChange={inputNameChangeValue}
      />
      <br />
      <LoginStyled.PaddingTop />
      <Styled.TextField
        isvalid={"false"}
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={inputPassChangeValue}
      />
      <br />
      <LoginStyled.PaddingTop />

      <ButtonStyled.Button onClick={handleSubmit}>
        アカウントを作成
      </ButtonStyled.Button>
      <br />
      <Link to={"/login"}>
        <p>既にアカウントをお持ちの方はこちら</p>
      </Link>
    </>
  );
};
export default Register;
