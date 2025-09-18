import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  message,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { userApi, type User } from "../../utils/api";

const UserManagement: React.FC = () => {
  // 状态管理
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  // 加载用户列表
  const loadUsers = async (
    page = currentPage,
    size = pageSize,
    search = searchText
  ) => {
    setLoading(true);
    try {
      const response = await userApi.getUsers({
        page,
        pageSize: size,
        search: search || undefined,
      });

      if (response.success && response.data) {
        setUsers(response.data.users);
        setTotal(response.data.total);
        setCurrentPage(response.data.page);
        setPageSize(response.data.pageSize);
      } else {
        message.error(response.message || "获取用户列表失败");
      }
    } catch (error) {
      message.error("获取用户列表失败");
      console.error("Load users error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时加载数据
  useEffect(() => {
    loadUsers();
  }, []);

  // 创建或更新用户
  const handleSubmit = async (values: any) => {
    try {
      let response;
      if (editingUser) {
        response = await userApi.updateUser(editingUser.id, values);
      } else {
        response = await userApi.createUser(values);
      }

      if (response.success) {
        message.success(
          response.message || (editingUser ? "用户更新成功" : "用户创建成功")
        );
        setIsModalVisible(false);
        form.resetFields();
        setEditingUser(null);
        loadUsers();
      } else {
        message.error(
          response.message || (editingUser ? "用户更新失败" : "用户创建失败")
        );
      }
    } catch (error) {
      message.error(editingUser ? "用户更新失败" : "用户创建失败");
      console.error("Submit user error:", error);
    }
  };

  // 删除用户
  const handleDelete = async (userId: number) => {
    try {
      const response = await userApi.deleteUser(userId);
      if (response.success) {
        message.success(response.message || "用户删除成功");
        loadUsers();
      } else {
        message.error(response.message || "用户删除失败");
      }
    } catch (error) {
      message.error("用户删除失败");
      console.error("Delete user error:", error);
    }
  };

  // 切换用户状态
  const handleToggleStatus = async (userId: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      const response = await userApi.updateUserStatus(userId, newStatus);
      if (response.success) {
        message.success("用户状态更新成功");
        loadUsers();
      } else {
        message.error(response.message || "用户状态更新失败");
      }
    } catch (error) {
      message.error("用户状态更新失败");
      console.error("Toggle status error:", error);
    }
  };

  // 打开新增/编辑模态框
  const openModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      form.setFieldsValue(user);
    } else {
      setEditingUser(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  // 搜索处理
  const handleSearch = () => {
    setCurrentPage(1);
    loadUsers(1, pageSize, searchText);
  };

  // 表格列定义
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
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
      render: (status: string, record: User) => (
        <Tag
          color={status === "active" ? "green" : "red"}
          style={{ cursor: "pointer" }}
          onClick={() => handleToggleStatus(record.id, status)}
        >
          {status === "active" ? "活跃" : "禁用"}
        </Tag>
      ),
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) =>
        createdAt ? new Date(createdAt).toLocaleDateString() : "-",
    },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: User) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => openModal(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个用户吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
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
        <Space>
          <Button icon={<ReloadOutlined />} onClick={() => loadUsers()}>
            刷新
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => openModal()}
          >
            新增用户
          </Button>
        </Space>
      </div>

      <Card>
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Input.Search
              placeholder="搜索用户名或邮箱"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onSearch={handleSearch}
              style={{ width: 300 }}
              enterButton={<SearchOutlined />}
            />
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={users}
          loading={loading}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size || 10);
              loadUsers(page, size || 10, searchText);
            },
          }}
        />
      </Card>

      {/* 新增/编辑用户模态框 */}
      <Modal
        title={editingUser ? "编辑用户" : "新增用户"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingUser(null);
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="username"
            label="用户名"
            rules={[
              { required: true, message: "请输入用户名" },
              { min: 2, message: "用户名至少2个字符" },
              { max: 20, message: "用户名最多20个字符" },
            ]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: "请输入邮箱" },
              { type: "email", message: "请输入有效的邮箱地址" },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: "请选择状态" }]}
            initialValue="active"
          >
            <Select>
              <Select.Option value="active">活跃</Select.Option>
              <Select.Option value="inactive">禁用</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Space>
              <Button
                onClick={() => {
                  setIsModalVisible(false);
                  form.resetFields();
                  setEditingUser(null);
                }}
              >
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                {editingUser ? "更新" : "创建"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
