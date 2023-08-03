import * as Styled from "../style/TextFieldStyled";
import * as ButtonStyled from "../style/ButtonStyled";
import * as LoginStyled from "../style/LoginStyle/loginStyled";

const signin = () => {
  console.log("sssss");
};

const Login = () => {
  return (
    <>
      <h3>Login</h3>
      <Styled.TextField type="text" placeholder="お名前" isvalid={"false"} />
      <br />
      <LoginStyled.PaddingTop />
      <Styled.TextField
        type="password"
        placeholder="パスワード"
        isvalid={"false"}
      />
      <br />
      <LoginStyled.PaddingTop />

      <ButtonStyled.Button>アカウントへログイン</ButtonStyled.Button>
    </>
  );
};

export default Login;
