import React from "react";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import zhCN from "antd/locale/zh_CN";
import router from "./router";

const App: React.FC = () => {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#1677ff",
          colorBgContainer: "#ffffff",
          colorBgLayout: "#f5f7fa",
          borderRadius: 8,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        },
        components: {
          Layout: {
            headerBg: "#ffffff",
            siderBg: "#f0f8ff",
          },
          Menu: {
            itemSelectedBg: "rgba(22, 119, 255, 0.15)",
            itemHoverBg: "rgba(22, 119, 255, 0.1)",
            itemSelectedColor: "#1677ff",
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
