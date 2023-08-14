import styled, { keyframes } from "styled-components";

export const RegisterContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;

export const Header = styled.header`
  background: #0067c0;
  padding-bottom: -10px;
`;

export const nomalFont = styled.p`
  font-size: 1rem;
  display: block;
  text-align: center;
  color: black;
  padding: 0;
  font-weight: bold;
`;

export const LoginImage = styled.img`
  width: 8%;
  display: block;
  margin: 0 auto;
`;

export const PaddingTop = styled.div`
  margin-top: 8px;
`;

export const Container = styled.div`
  width: 90%;
  margin: 0 auto;
`;

export const LoginFontStyle = styled.h2`
  text-align: center;
`;
export const LoginFontErrorStyle = styled.h2`
  text-align: left;
  font-size: 1rem;
  color: red;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

// Here we create a component that will rotate everything we pass in over two seconds
export const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  /* padding: 2rem 1rem; */
  font-size: 0.8rem;
`;
