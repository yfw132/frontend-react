import React from "react";
import { Card, Table, Button, Space, Tag } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const UserManagement: React.FC = () => {
  // 示例数据
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? "活跃" : "禁用"}
        </Tag>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />}>
            编辑
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const mockData = [
    {
      key: "1",
      id: 1,
      username: "张三",
      email: "zhangsan@example.com",
      status: "active",
    },
    {
      key: "2",
      id: 2,
      username: "李四",
      email: "lisi@example.com",
      status: "inactive",
    },
    {
      key: "3",
      id: 3,
      username: "王五",
      email: "wangwu@example.com",
      status: "active",
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h1 style={{ margin: 0, color: "#1677ff" }}>用户管理</h1>
        <Button type="primary" icon={<PlusOutlined />}>
          新增用户
        </Button>
      </div>

      <Card>
        <p style={{ marginBottom: 16, color: "#666" }}>
          这是用户管理页面，您可以在这里管理系统用户。
        </p>
        <Table
          columns={columns}
          dataSource={mockData}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default UserManagement;
