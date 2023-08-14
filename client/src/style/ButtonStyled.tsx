import styled, { keyframes } from "styled-components";

export const Button = styled.button`
  width: 98%;
  display: block;
  margin: 0 auto;
  border-radius: 0.8rem;
  height: 3rem;
  color: #0067c0;
  background: #fff;
  border: solid #0067c0 1px;
  text-align: center;
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

export const nomalFont = styled.p`
  font-size: 1rem;
  display: block;
  text-align: center;
  color: black;
  padding: 0;
  font-weight: bold;
`;
