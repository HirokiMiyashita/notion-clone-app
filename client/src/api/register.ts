import { authApi } from "./authApi";

interface RegisterProps {
  username: string;
  password: string;
}

export const register = async ({ username, password }: RegisterProps) => {
  try {
    console.log(username, password);
    const res = await authApi.register({
      username: username,
      password: password,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
