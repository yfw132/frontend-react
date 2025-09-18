import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// 设置 MSW 浏览器端 worker
export const worker = setupWorker(...handlers);

// 启动 worker 的配置
export const startWorker = () => {
  return worker.start({
    onUnhandledRequest: "warn",
    serviceWorker: {
      url: "/mockServiceWorker.js",
    },
  });
};
