import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Skeleton } from 'antd';

const Users = React.lazy(() => import('.'));
const UserAdd = React.lazy(() => import('../UserAdd'));
const User = React.lazy(() => import('../User'));
const UserInfo = React.lazy(() => import('../UserInfo'));
const UserPasswd = React.lazy(() => import('../UserPasswd'));

function RouteList() {
  return (
    <React.Suspense fallback={<Skeleton active />}>
      <Routes>
        <Route index element={<Users />} />
        <Route path="add" element={<UserAdd />} />
        <Route path=":userId/*" element={<User />}>
          <Route path="info" element={<UserInfo />} />
          <Route path="password" element={<UserPasswd />} />
          <Route path="*" element={<Navigate replace to="info" />} />
        </Route>
        <Route path="*" element={<Navigate replace to="" />} />
      </Routes>
    </React.Suspense>
  );
}

export default React.memo(RouteList, () => true);
