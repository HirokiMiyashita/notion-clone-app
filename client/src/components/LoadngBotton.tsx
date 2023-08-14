import React from "react";
import * as ButtonStyled from "../style/ButtonStyled";

interface LoadingButtonProps {
  handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
  isLoading: boolean;
  text: string;
}

export const LoadngBotton = ({
  handleSubmit,
  isLoading,
  text,
}: LoadingButtonProps) => {
  return (
    <ButtonStyled.Button onClick={handleSubmit}>
      {isLoading ? (
        <ButtonStyled.Rotate>&lt; 💅🏾 &gt;</ButtonStyled.Rotate>
      ) : (
        <ButtonStyled.nomalFont>{text}</ButtonStyled.nomalFont>
      )}
    </ButtonStyled.Button>
  );
};
