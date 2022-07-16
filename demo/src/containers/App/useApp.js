import React from "react";
import { useRecoilState } from "recoil";
import { loadingState, userInfoState } from "./appRecoil";

function getUserInfo() {
  return new Promise((resolve, reject) => {
    console.log("getUserInfo");
    global.setTimeout(() => {
      resolve({
        data: {
          username: "aaaa",
          title: "测试用户昵称",
        },
      });
    }, 1000);
  });
}

function useApp() {
  const [loading, setLoading] = useRecoilState(loadingState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const ref = React.useRef({});

  const onLoad = React.useCallback(async () => {
    if (!ref.current || ref.current.loading) {
      return;
    }
    setLoading(true);
    ref.current.loading = true;
    const { data } = await getUserInfo();
    if (!ref.current || !ref.current.loading) {
      return;
    }
    setUserInfo(data || null);
    setLoading(false);
  }, [setLoading, setUserInfo]);

  React.useEffect(() => {
    ref.current = {};
    return () => {
      ref.current = null;
    };
  }, [onLoad]);

  React.useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.loading = loading;
  }, [loading]);

  React.useEffect(() => {
    onLoad();
  }, [onLoad]);

  return { loading, userInfo };
}

export default useApp;
