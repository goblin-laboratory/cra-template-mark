import React from "react";
import { Outlet } from "react-router-dom";
import { Layout, Skeleton, Menu, Result, Button } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import SiderMenu from "./SiderMenu";
import useApp from "./useApp";
import styles from "./index.module.less";

function AppLayout() {
  const { loading, userInfo } = useApp();
  if (loading) {
    return <Skeleton active />;
  }
  if (!userInfo) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="网络异常，请检查后刷新页面重试。"
        extra={
          <Button type="primary" onClick={() => global.location.reload()}>
            刷新
          </Button>
        }
      />
    );
  }
  return (
    <Layout className={styles.layout}>
      <Layout.Sider theme="dark" breakpoint="md" className={styles.sider}>
        <div className={styles.trademark}>
          <div className={styles.brand}>cra-template-mark</div>
        </div>
        <SiderMenu />
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
