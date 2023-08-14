import { AxiosClient } from "./axiosClient";

export const memoApi = {
  createMemo: () => AxiosClient.post("api/memo"),
  getMemosAll: () => AxiosClient.get("api/getMemoAll"),
  getMemoOne: (id: string | undefined) =>
    AxiosClient.get(`api/getMemoOne/${id}`),
  updateMemo: (id: string | undefined, params: any) =>
    AxiosClient.put(`api/update/${id}`, params),
  deleteMemo: (id: string | undefined) => AxiosClient.put(`api/delete/${id}`),
};
