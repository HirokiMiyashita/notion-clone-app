import styled from "styled-components";

interface TextFieldProps {
  isvalid: string;
}

export const TextField = styled.input<TextFieldProps>`
  color: black;
  width: 60%;
  height: 2rem;
  background-color: ${({ isvalid }) => (isvalid == "true" ? "red" : "blue")};
  /* isValidがtrueの場合 */
`;
