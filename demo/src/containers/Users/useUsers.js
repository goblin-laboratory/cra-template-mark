import React from "react";
import queryString from "query-string";
// import { useSelector, shallowEqual } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function getUserList({ start, limit }) {
  console.log("getUserList");
  return new Promise((resolve, reject) => {
    global.setTimeout(() => {
      const data = { total: 100, list: [], start };
      if (start <= data.total) {
        data.list = [
          { username: "a1", role: 1, title: "用户 1" },
          { username: "a2", role: 0, title: "用户 2" },
          { username: "a3", role: 1, title: "用户 3" },
          { username: "a4", role: 1, title: "用户 4" },
          { username: "a5", role: 1, title: "用户 5" },
          { username: "a6", role: 2, title: "用户 6" },
          { username: "a7", role: 1, title: "用户 7" },
          { username: "a8", role: 1, title: "用户 8" },
          { username: "a9", role: 1, title: "用户 9" },
          { username: "a10", role: 1, title: "用户 10" },
          { username: "a11", role: 1, title: "用户 10" },
          { username: "a12", role: 1, title: "用户 10" },
          { username: "a13", role: 1, title: "用户 10" },
          { username: "a14", role: 1, title: "用户 10" },
          { username: "a15", role: 1, title: "用户 10" },
          { username: "a17", role: 1, title: "用户 10" },
          { username: "a18", role: 1, title: "用户 10" },
          { username: "a19", role: 1, title: "用户 10" },
          { username: "a20", role: 1, title: "用户 10" },
        ];
      }
      resolve({ data });
    }, 1000);
  });
}

const initialState = {
  page: 1,
  pageSize: 20,
  loading: false,
  list: [],
  loaded: false,
  total: 0,
};

const reducer = (state, action) => {
  if ("clear" === action.type) {
    return { ...initialState };
  }
  return { ...state, ...action.payload };
};

function useUsers() {
  const location = useLocation();
  const navigate = useNavigate();
  const [{ page, pageSize, loading, list, total }, dispatch] = React.useReducer(
    reducer,
    initialState
  );
  const ref = React.useRef({});

  // const { roleInfo } = useSelector(
  //   (state) => ({
  //     roleInfo: state.app.roleInfo || null,
  //   }),
  //   shallowEqual
  // );

  const onLoad = React.useCallback(
    async (params) => {
      if (!ref.current || ref.current.loading) {
        return;
      }
      dispatch({ type: "save", payload: { loading: true, page: params.page } });
      ref.current.loading = true;
      const { data } = await getUserList({
        start: (params.page - 1) * pageSize,
        limit: pageSize,
      });
      console.log(`onLoad loading: ${ref.current.loading}`);
      if (!ref.current || !ref.current.loading) {
        return;
      }
      const payload = { loading: false, list: [], total: 0 };
      if (data) {
        payload.list = data.list;
        payload.total = data.total;
      }
      dispatch({ type: "save", payload });
    },
    [dispatch, pageSize]
  );

  const onPageChange = React.useCallback(
    (targetPage) => {
      const p = {};
      if (1 !== targetPage) {
        p.page = targetPage;
      }
      const stringified = queryString.stringify(p);
      navigate({
        pathname: location.pathname,
        search: "" === stringified ? "" : `?${stringified}`,
      });
    },
    [navigate, location]
  );

  const onRefresh = React.useCallback(() => {
    navigate(
      { pathname: location.pathname, search: location.search },
      { replace: true }
    );
  }, [navigate, location]);

  const onAddClick = React.useCallback(() => {
    navigate("/users/add");
  }, [navigate]);

  React.useEffect(() => {
    return () => {
      console.log("useUsers unmounted");
      ref.current = {};
    };
  }, []);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.loading = loading;
  }, [loading]);

  React.useEffect(() => {
    const parsed = queryString.parse(location.search);
    const currentPage = parseInt(parsed.page || 1, 10);
    onLoad({ page: currentPage });
  }, [onLoad, location]);

  return {
    page,
    pageSize,
    total,
    loading,
    list,
    onRefresh,
    onAddClick,
    onPageChange,
  };
}

export default useUsers;
