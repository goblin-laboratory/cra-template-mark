import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu } from "antd";
import { DashboardOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";

const getSelectedKeys = ({ location }) => {
  const matched = location.pathname.match(/^(\/[^/]*)(\/.*)?$/);
  if (matched && matched[1]) {
    return [matched[1]];
  }
  return ["/"];
};

function SiderMenu() {
  const location = useLocation();

  const selectedKeys = React.useMemo(
    () => getSelectedKeys({ location }),
    [location]
  );

  return (
    <Menu
      mode="inline"
      theme="dark"
      selectedKeys={selectedKeys}
      items={[
        {
          key: "/",
          label: (
            <Link to="/">
              <DashboardOutlined />
              <span>系统概况</span>
            </Link>
          ),
        },
        {
          key: "/users",
          label: (
            <Link to="/users">
              <TeamOutlined />
              <span>用户管理</span>
            </Link>
          ),
        },
        {
          key: "/user",
          label: (
            <Link to="/user">
              <UserOutlined />
              <span>个人中心</span>
            </Link>
          ),
        },
      ]}
    ></Menu>
  );
}

export default React.memo(SiderMenu, () => true);
