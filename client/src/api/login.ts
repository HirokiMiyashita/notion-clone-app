import { NavigateFunction } from "react-router-dom";
import { authApi } from "./authApi";

interface LoginProps {
  username: string;
  password: string;
  setValidate: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: NavigateFunction;
}

export const login = async ({
  username,
  password,
  setValidate,
  setIsLoading,
  navigate,
}: LoginProps) => {
  setIsLoading(true);
  try {
    const res = await authApi.login({
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
        if (j.path === "username" || j.path === "password") {
          return setValidate(j.msg);
        } else {
          setValidate("");
        }

        return;
      });
      setIsLoading(false);
    });
  }
};
