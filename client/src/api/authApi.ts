import { AxiosClient } from "./axiosClient";

export const authApi = {
  register: (params: any) => AxiosClient.post("api/register", params),
  login: (params: any) => AxiosClient.post("api/login", params),
  verifyToken: () => AxiosClient.post("api/verify-token"),
};
