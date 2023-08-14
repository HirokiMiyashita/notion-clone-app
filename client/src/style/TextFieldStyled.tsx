import styled from "styled-components";

interface TextFieldProps {
  isvalid: string;
}

export const TextField = styled.input`
  color: black;
  width: 95%;
  margin: 0 auto;
  display: block;
  height: 2rem;
  /* isValidがtrueの場合 */
`;
