import React from "react";
// import { Button } from "antd";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AppLayout from "./AppLayout";

const Home = React.lazy(() => import("../Home"));
const Users = React.lazy(() => import("../Users/RouteList"));
const User = React.lazy(() => import("../User"));

const App = () => {
  return (
    <React.Suspense fallback={null}>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="/users/*" element={<Users />} />
            <Route path="/user/*" element={<User />} />
          </Route>
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};

export default React.memo(App, () => true);
