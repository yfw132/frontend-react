# MSW (Mock Service Worker) 配置说明

本项目已配置 MSW 2.11.2 版本，用于用户管理数据的 mock，支持环境配置。

## 📋 功能特性

- ✅ 基于 MSW 2.11.2 最新版本
- ✅ 用户管理完整 CRUD 操作 mock
- ✅ 支持分页、搜索功能
- ✅ 环境配置：开发环境启用，生产环境禁用
- ✅ 完整的 TypeScript 支持
- ✅ 与 Ant Design 组件深度集成

## 🚀 快速开始

### 1. 环境配置

项目支持通过环境变量控制 MSW 的启用状态：

**开发环境**（默认启用 MSW）：

```bash
# .env.development 或 .env.local
VITE_ENABLE_MSW=true
VITE_API_BASE_URL=http://localhost:3000
```

**生产环境**（默认禁用 MSW）：

```bash
# .env.production
VITE_ENABLE_MSW=false
VITE_API_BASE_URL=https://api.your-domain.com
```

### 2. 启动项目

```bash
# 开发环境（自动启用 MSW）
npm run dev

# 生产环境构建（不启用 MSW）
npm run build
npm run preview
```

### 3. 禁用 MSW（开发环境）

如果在开发环境中想要连接真实 API，可以设置：

```bash
# .env.local
VITE_ENABLE_MSW=false
```

或者在启动时设置：

```bash
VITE_ENABLE_MSW=false npm run dev
```

## 📁 文件结构

```
src/
├── mocks/                    # MSW 相关文件
│   ├── handlers.ts          # API 处理程序
│   └── browser.ts           # 浏览器端 worker 配置
├── utils/
│   └── api.ts               # API 客户端和类型定义
├── page/
│   └── UserManagement/      # 用户管理页面
│       └── index.tsx
└── main.tsx                 # 应用入口（包含 MSW 启动逻辑）
```

## 🔧 API 接口说明

### 用户管理 API

| 方法   | 路径                    | 说明         | 参数                                |
| ------ | ----------------------- | ------------ | ----------------------------------- |
| GET    | `/api/users`            | 获取用户列表 | `page`, `pageSize`, `search`        |
| GET    | `/api/users/:id`        | 获取用户详情 | `id`                                |
| POST   | `/api/users`            | 创建用户     | `username`, `email`, `status`       |
| PUT    | `/api/users/:id`        | 更新用户     | `id`, `username`, `email`, `status` |
| DELETE | `/api/users/:id`        | 删除用户     | `id`                                |
| DELETE | `/api/users`            | 批量删除用户 | `ids[]`                             |
| PATCH  | `/api/users/:id/status` | 切换用户状态 | `id`, `status`                      |

### 响应格式

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}
```

## 🎯 功能演示

### 用户列表功能

- ✅ 分页显示用户
- ✅ 搜索用户（按用户名/邮箱）
- ✅ 点击状态标签切换用户状态
- ✅ 实时刷新数据

### 用户操作功能

- ✅ 新增用户（表单验证）
- ✅ 编辑用户信息
- ✅ 删除用户（确认弹窗）
- ✅ 错误处理和成功提示

## 🔄 自定义 Mock 数据

### 修改用户数据

编辑 `src/mocks/handlers.ts` 文件中的 `mockUsers` 数组：

```typescript
const mockUsers = [
  {
    id: 1,
    username: "自定义用户名",
    email: "custom@example.com",
    status: "active",
    createdAt: "2024-01-15T08:30:00Z",
    updatedAt: "2024-01-15T08:30:00Z",
  },
  // 添加更多用户...
];
```

### 添加新的 API 接口

在 `src/mocks/handlers.ts` 中添加新的处理程序：

```typescript
export const handlers = [
  // 现有的用户管理接口...

  // 新增自定义接口
  http.get("/api/custom-endpoint", () => {
    return HttpResponse.json({
      success: true,
      data: { message: "Custom API response" },
    });
  }),
];
```

## 🔍 调试和监控

### 检查 MSW 状态

打开浏览器开发者工具，在 Console 中查看：

- ✅ `[MSW] Mocking enabled.` - MSW 启动成功
- ✅ 网络请求被拦截的日志

### 查看 Mock 请求

在 Network 标签页中，可以看到：

- 请求被 `(from disk cache)` 标记
- 响应来自 Service Worker

## ⚡ 最佳实践

### 1. 环境区分

- 开发环境：使用 MSW 进行前端独立开发
- 测试环境：可选择性启用 MSW 或连接测试 API
- 生产环境：始终禁用 MSW，连接真实 API

### 2. 数据管理

- Mock 数据应该尽可能接近真实数据结构
- 定期同步 Mock 数据与后端 API 规范
- 使用有意义的测试数据而非随机数据

### 3. 错误处理

- Mock 接口应该包含各种错误场景
- 模拟网络延迟和错误状态码
- 提供清晰的错误消息

## 🔧 故障排除

### MSW 未启动

1. 检查 `public/mockServiceWorker.js` 文件是否存在
2. 确认环境变量 `VITE_ENABLE_MSW` 设置
3. 查看浏览器控制台错误信息

### 请求未被拦截

1. 确认 API 路径与 handlers 中定义的路径匹配
2. 检查请求方法（GET/POST/PUT/DELETE）是否正确
3. 验证 Service Worker 是否正常运行

### TypeScript 类型错误

1. 确保 API 类型定义与 Mock 数据结构一致
2. 使用 `type` 关键字导入类型而非值

## 📚 参考资源

- [MSW 官方文档](https://mswjs.io/docs/)
- [MSW 2.x 迁移指南](https://mswjs.io/docs/migrations/1.x-to-2.x)
- [Vite 环境变量](https://vitejs.dev/guide/env-and-mode.html)
- [Ant Design 组件库](https://ant.design/components/overview-cn)

## 🎉 总结

通过这个配置，你可以：

- 在开发环境中独立于后端进行前端开发
- 通过环境变量灵活控制 Mock 的启用状态
- 享受完整的用户管理功能和类型安全
- 轻松扩展和自定义 Mock 数据和 API

现在你可以访问用户管理页面，体验完整的 CRUD 功能！🎊
