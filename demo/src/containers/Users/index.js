import React from "react";
import { Link } from "react-router-dom";
import { PageHeader, Card, Table, Button } from "antd";
import { ReloadOutlined, PlusOutlined, TeamOutlined } from "@ant-design/icons";
import { getPagination } from "../../utils/";
import useUsers from "./useUsers";
// import styles from "./index.module.less";

function Users() {
  const {
    page,
    pageSize,
    total,
    loading,
    list,
    onRefresh,
    onAddClick,
    onPageChange,
  } = useUsers();

  return (
    <>
      <PageHeader
        title={
          <>
            <TeamOutlined /> 用户管理
          </>
        }
        breadcrumb={null}
        onBack={null}
        ghost={false}
        extra={
          <>
            <Button icon={<ReloadOutlined />} onClick={onRefresh}>
              刷新
            </Button>
            <Button icon={<PlusOutlined />} onClick={onAddClick}>
              添加
            </Button>
          </>
        }
      />
      <Card bordered={false}>
        <Table
          loading={loading}
          dataSource={list}
          rowKey="username"
          pagination={getPagination({
            current: page,
            pageSize,
            total,
            onChange: onPageChange,
          })}
          columns={[
            { title: "用户名", dataIndex: "username" },
            {
              title: "角色",
              dataIndex: "role",
              align: "center",
            },
            { title: "昵称", dataIndex: "title" },
            {
              title: "操作",
              dataIndex: "username",
              key: "key",
              align: "center",
              render: (v) => <Link to={`/users/${v}`}>详情</Link>,
            },
          ]}
        />
      </Card>
    </>
  );
}

export default React.memo(Users, () => true);
