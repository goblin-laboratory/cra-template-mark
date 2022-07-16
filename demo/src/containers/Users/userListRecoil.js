import { atom } from "recoil";

const loadingState = atom({
  key: "loading",
  default: false,
});

const userInfoState = atom({
  key: "userInfo",
  default: null,
});

export { loadingState, userInfoState };
