import { atom } from "recoil";

const loadingState = atom({
  key: "loading",
  default: false,
});

const userState = atom({
  key: "user",
  default: null,
});

export { loadingState, userState };
