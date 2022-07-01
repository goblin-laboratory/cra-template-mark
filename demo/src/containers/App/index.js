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
const Users = React.lazy(() => import("../Users"));

const App = () => {
  return (
    <React.Suspense fallback={null}>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="/users/*" element={<Users />} />
          </Route>
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};

export default App;
