import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

// recoil로 관리할 변수들
// email
export const emailState = atom({
  key: "emailState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// nickname
export const nicknameState = atom({
  key: "nicknameState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
