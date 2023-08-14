import { atom } from "recoil";
// import { recoilPersist } from "recoil-persist";
// const recoilPersist = localStorage.getItem("recoil-persist");
// const { persistAtom } = recoilPersist();
export const uidState = atom({
  key: "uidState",
  // デフォルトuid
  default: "",
  // effects: [localStorage('recoil-persist')]
  // effects_UNSTABLE: [recoilPersist],
  // effects_UNSTABLE: [persistAtom],
});
