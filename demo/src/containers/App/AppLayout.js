import React from "react";
import { Outlet } from "react-router-dom";
import { Layout, Skeleton, Menu } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import styles from "./index.module.less";

function AppLayout() {
  return (
    <Layout className={styles.layout}>
      <Layout.Sider theme="dark" breakpoint="md" className={styles.sider}>
        <h1>cra-template-mark</h1>
        <Menu
          mode="inline"
          theme="dark"
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
          ]}
        ></Menu>
      </Layout.Sider>
      <Layout id="backTopTarget">
        <Layout.Header className={styles.header}>
          <div className={styles.flexItem}></div>
          <Menu
            selectedKeys={[]}
            mode="horizontal"
            items={[
              {
                key: "user",
                label: (
                  <Link to="/user">
                    <UserOutlined />
                    <span>用户昵称</span>
                  </Link>
                ),
              },
              {
                key: "logout",
                icon: <LogoutOutlined />,
                label: "注销",
              },
            ]}
          ></Menu>
        </Layout.Header>
        <Layout.Content className={styles.content}>
          <React.Suspense fallback={<Skeleton active />}>
            <Outlet />
          </React.Suspense>
          <Layout.Footer />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default React.memo(AppLayout, () => true);
