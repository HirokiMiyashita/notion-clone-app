import { NavigateFunction } from "react-router-dom";
import { authApi } from "./authApi";
import { response } from "express";

interface RegisterProps {
  username: string;
  password: string;
  setNameValidate: React.Dispatch<React.SetStateAction<string>>;
  setPassValidate: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: NavigateFunction;
}

export const register = async ({
  username,
  password,
  setNameValidate,
  setPassValidate,
  setIsLoading,
  navigate,
}: RegisterProps) => {
  setIsLoading(true);
  try {
    const res = await authApi.register({
      username: username,
      password: password,
    });
    localStorage.setItem("token", res.data.token);
    setIsLoading(false);
    navigate("/");
  } catch (error: any) {
    const errors: object = error.response.data;

    const keys = Object.values(errors);
    keys.map((e) => {
      e.map((j: any) => {
        if (j.path === "password") {
          return setPassValidate(j.msg);
        } else if (j.path === "username") {
          return setNameValidate(j.msg);
        } else {
          setPassValidate("");
          setNameValidate("");
        }

        return;
      });
      setIsLoading(false);
    });
  }
};
