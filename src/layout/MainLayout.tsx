import React from "react";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: "仪表盘",
    },
    {
      key: "/user-management",
      icon: <UserOutlined />,
      label: "用户管理",
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: "系统设置",
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f7fa" }}>
      <Sider
        theme="light"
        width={250}
        style={{
          background: "linear-gradient(180deg, #e6f4ff 0%, #f0f8ff 100%)",
          boxShadow: "2px 0 6px rgba(0,0,0,0.1)",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            height: 64,
            margin: "16px",
            background: "linear-gradient(135deg, #1677ff 0%, #4096ff 100%)",
            borderRadius: borderRadiusLG,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "18px",
            fontWeight: "bold",
            boxShadow: "0 2px 8px rgba(22, 119, 255, 0.3)",
          }}
        >
          管理系统
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{
            border: "none",
            background: "transparent",
          }}
          className="custom-menu"
        />
      </Sider>
      <Layout style={{ marginLeft: 250, background: "#f5f7fa" }}>
        <Header
          style={{
            padding: "0 32px",
            background: "#fff",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #e8f4fd",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#1677ff",
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            后台管理系统
          </h2>
          <div
            style={{
              color: "#1677ff",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            欢迎使用
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 24px 24px 24px",
            padding: 32,
            minHeight: "calc(100vh - 112px)",
            background: "#fff",
            borderRadius: borderRadiusLG,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            border: "1px solid #e8f4fd",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
