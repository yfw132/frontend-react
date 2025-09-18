import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "antd/dist/reset.css";
import "./index.css";
import App from "./App.tsx";

// 根据环境配置启动 MSW
async function enableMocking() {
  // 只在开发环境启动 MSW
  if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_MSW !== "false") {
    const { startWorker } = await import("./mocks/browser");

    return startWorker();
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
