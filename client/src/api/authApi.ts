import { AxiosClient } from "./axiosClient";

export const authApi = {
  register: (params: any) => AxiosClient.post("api/register", params),
};
