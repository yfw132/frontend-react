# 后台管理系统

> 基于 React + TypeScript + Vite + Ant Design 构建的现代化后台管理系统基础框架

## 📋 项目概述

这是一个采用现代前端技术栈构建的后台管理系统模板，提供了完整的基础架构和开发规范。项目采用浅色蓝白主题设计，具有清爽现代的视觉体验和良好的用户交互体验。

## ✨ 主要特性

- 🚀 **现代技术栈** - React 19 + TypeScript + Vite 7
- 🎨 **优雅 UI 设计** - Ant Design 5.x + 浅色蓝白主题
- 📱 **响应式布局** - 固定侧边栏 + 自适应内容区域
- 🗂️ **清晰目录结构** - 模块化组件管理和页面组织
- 🎯 **开发规范** - 统一的代码风格和项目结构
- 🔄 **路由管理** - React Router v7 单页应用路由
- 🛠️ **工具函数** - 常用工具方法集合

## 🛠️ 技术栈

- **框架**: React 19.1.1
- **构建工具**: Vite 7.1.2
- **语言**: TypeScript 5.8.3
- **UI 库**: Ant Design 5.27.2
- **路由**: React Router DOM 7.8.2
- **代码检查**: ESLint 9.33.0

## 📁 项目结构

```
src/
├── components/          # 公用组件目录
│   └── index.ts        # 组件统一导出文件
├── page/               # 页面目录
│   ├── Dashboard/      # 仪表盘页面
│   │   └── index.tsx   # 页面主入口文件
│   ├── UserManagement/ # 用户管理页面
│   │   └── index.tsx   # 页面主入口文件
│   └── Settings/       # 系统设置页面
│       └── index.tsx   # 页面主入口文件
├── utils/              # 工具函数目录
│   └── index.ts        # 工具函数导出文件
├── layout/             # 布局组件目录
│   └── MainLayout.tsx  # 主布局组件
├── router/             # 路由配置目录
│   └── index.tsx       # 路由配置文件
├── App.tsx             # 根组件
├── main.tsx            # 应用入口
└── index.css           # 全局样式
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看应用

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 📚 页面介绍

### 🏠 仪表盘 (Dashboard)

- **路径**: `/`
- **功能**: 系统概览，包含统计卡片和欢迎信息
- **特色**: 数据统计展示、快速导航

### 👥 用户管理 (UserManagement)

- **路径**: `/user-management`
- **功能**: 用户信息管理界面
- **特色**: 表格展示、操作按钮、状态标签

### ⚙️ 系统设置 (Settings)

- **路径**: `/settings`
- **功能**: 系统参数配置界面
- **特色**: 表单配置、开关控制、设置保存

## 🎨 设计特色

### 🎨 视觉设计

- **主色调**: 蓝色系 (#1677ff)
- **背景色**: 浅灰蓝 (#f5f7fa) + 纯白 (#ffffff)
- **交互反馈**: 流畅的悬停和选中动效
- **现代元素**: 圆角、阴影、渐变

### 📐 布局特点

- **固定侧边栏**: 250px 宽度，渐变背景
- **响应式内容**: 自适应主内容区域
- **统一间距**: 24px 标准间距系统
- **卡片布局**: 内容区域采用卡片式设计

## 🏗️ 开发规范

### 📂 目录使用规范

1. **components/** - 公用组件存放

   - 可被多个页面复用的组件
   - 统一在 `index.ts` 中导出
   - 每个组件独立文件夹

2. **page/** - 页面内容管理

   - 每个页面独立文件夹
   - `index.tsx` 作为页面主入口
   - 页面特有组件放入 `page/components/` 或者公用组件 `components/`
   - 保持 `index.tsx` 简洁，主要用于组件组合

3. **utils/** - 工具函数集合

   - 通用工具方法
   - 业务无关的纯函数
   - 统一导出管理

4. **layout/** - 布局组件
   - 系统级布局组件
   - 页面框架和导航结构

### 📝 代码规范

- **组件命名**: PascalCase (如: `UserManagement`)
- **文件命名**: PascalCase (如: `MainLayout.tsx`)
- **变量命名**: camelCase (如: `userName`)
- **常量命名**: UPPER_SNAKE_CASE (如: `API_BASE_URL`)

### 🎯 开发建议

1. **保持组件单一职责**: 每个组件专注于一个功能
2. **合理使用 TypeScript**: 充分利用类型系统提高代码质量
3. **遵循 Ant Design 规范**: 保持设计语言一致性
4. **组件复用优先**: 优先使用公用组件，避免重复开发

## 🔧 自定义配置

### 主题配置

主题配置位于 `src/App.tsx`，可以自定义：

```typescript
theme={{
  token: {
    colorPrimary: '#1677ff',      // 主色调
    colorBgContainer: '#ffffff',  // 容器背景色
    colorBgLayout: '#f5f7fa',     // 布局背景色
    borderRadius: 8,              // 圆角大小
  },
  components: {
    Layout: {
      headerBg: '#ffffff',        // 头部背景色
      siderBg: '#f0f8ff',        // 侧边栏背景色
    },
  },
}}
```

### 路由配置

路由配置位于 `src/router/index.tsx`，添加新页面：

```typescript
{
  path: 'new-page',
  element: <NewPage />,
}
```

## 📦 依赖说明

### 核心依赖

- **react**: React 核心库
- **react-dom**: React DOM 操作
- **react-router-dom**: 客户端路由
- **antd**: UI 组件库

### 开发依赖

- **typescript**: TypeScript 支持
- **vite**: 构建工具
- **eslint**: 代码检查

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支: `git checkout -b feature/AmazingFeature`
3. 提交更改: `git commit -m 'Add some AmazingFeature'`
4. 推送分支: `git push origin feature/AmazingFeature`
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🆘 支持

如果你觉得这个项目对你有帮助，请给一个 ⭐️ 支持！

---

**Happy Coding! 🎉**
