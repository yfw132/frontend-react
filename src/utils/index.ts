// 导出所有工具函数和 API
export * from "./api";

// 环境配置工具
export const getEnvConfig = () => ({
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  enableMSW: import.meta.env.VITE_ENABLE_MSW !== "false",
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "",
});

// 打印当前环境配置（用于调试）
export const logEnvConfig = () => {
  const config = getEnvConfig();
  console.log("🔧 Environment Config:", {
    mode: import.meta.env.MODE,
    isDev: config.isDev,
    isProd: config.isProd,
    enableMSW: config.enableMSW,
    apiBaseUrl: config.apiBaseUrl,
  });
};
