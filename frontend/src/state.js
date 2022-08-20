import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

// auth
export const authState = atom({
  key: "authState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

// nickname
export const nameState = atom({
  key: "nameState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
