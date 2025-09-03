import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 style={{ marginBottom: 24, color: "#1677ff" }}>仪表盘</h1>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="总用户数"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<UserOutlined />}
              suffix="万"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="今日订单"
              value={112893}
              precision={0}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="总收入"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<DollarOutlined />}
              suffix="万"
            />
          </Card>
        </Col>
      </Row>

      <Card title="欢迎使用管理系统" style={{ marginBottom: 24 }}>
        <p>这是仪表盘页面，您可以在这里查看系统的整体运营情况。</p>
        <p>页面内容为空，等待您的具体业务需求来填充。</p>
      </Card>
    </div>
  );
};

export default Dashboard;
