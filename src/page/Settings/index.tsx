import React from "react";
import { Card, Form, Input, Switch, Button, Divider, Space } from "antd";
import { SaveOutlined, ReloadOutlined } from "@ant-design/icons";

const Settings: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Settings saved:", values);
  };

  return (
    <div>
      <h1 style={{ marginBottom: 24, color: "#1677ff" }}>系统设置</h1>

      <Card title="基本设置" style={{ marginBottom: 24 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            siteName: "后台管理系统",
            siteDescription: "基于React + Antd的管理系统",
            enableNotifications: true,
            enableMaintenance: false,
          }}
        >
          <Form.Item
            label="网站名称"
            name="siteName"
            rules={[{ required: true, message: "请输入网站名称" }]}
          >
            <Input placeholder="请输入网站名称" />
          </Form.Item>

          <Form.Item label="网站描述" name="siteDescription">
            <Input.TextArea rows={4} placeholder="请输入网站描述" />
          </Form.Item>

          <Divider />

          <Form.Item
            label="开启通知"
            name="enableNotifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="维护模式"
            name="enableMaintenance"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                保存设置
              </Button>
              <Button
                icon={<ReloadOutlined />}
                onClick={() => form.resetFields()}
              >
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card title="说明">
        <p>这是系统设置页面，您可以在这里配置系统的各种参数。</p>
        <p>页面内容为基础示例，可根据实际业务需求进行调整。</p>
      </Card>
    </div>
  );
};

export default Settings;
