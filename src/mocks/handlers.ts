import { http, HttpResponse } from "msw";

// 用户管理相关的 Mock 数据
const mockUsers = [
  {
    id: 1,
    username: "张三",
    email: "zhangsan@example.com",
    status: "active",
    createdAt: "2024-01-15T08:30:00Z",
    updatedAt: "2024-01-15T08:30:00Z",
  },
  {
    id: 2,
    username: "李四",
    email: "lisi@example.com",
    status: "inactive",
    createdAt: "2024-01-16T09:15:00Z",
    updatedAt: "2024-01-16T09:15:00Z",
  },
  {
    id: 3,
    username: "王五",
    email: "wangwu@example.com",
    status: "active",
    createdAt: "2024-01-17T10:45:00Z",
    updatedAt: "2024-01-17T10:45:00Z",
  },
  {
    id: 4,
    username: "赵六",
    email: "zhaoliu@example.com",
    status: "active",
    createdAt: "2024-01-18T14:20:00Z",
    updatedAt: "2024-01-18T14:20:00Z",
  },
  {
    id: 5,
    username: "钱七",
    email: "qianqi@example.com",
    status: "inactive",
    createdAt: "2024-01-19T16:30:00Z",
    updatedAt: "2024-01-19T16:30:00Z",
  },
];

// 用于生成新用户 ID
let nextUserId = mockUsers.length + 1;

export const handlers = [
  // 获取用户列表
  http.get("/api/users", ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10");
    const search = url.searchParams.get("search") || "";

    // 过滤搜索结果
    let filteredUsers = mockUsers;
    if (search) {
      filteredUsers = mockUsers.filter(
        (user) =>
          user.username.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 分页处理
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return HttpResponse.json({
      success: true,
      data: {
        users: paginatedUsers,
        total: filteredUsers.length,
        page,
        pageSize,
      },
    });
  }),

  // 获取单个用户详情
  http.get("/api/users/:id", ({ params }) => {
    const { id } = params;
    const user = mockUsers.find((u) => u.id === parseInt(id as string));

    if (!user) {
      return HttpResponse.json(
        {
          success: false,
          message: "用户不存在",
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      success: true,
      data: user,
    });
  }),

  // 创建新用户
  http.post("/api/users", async ({ request }) => {
    const newUser = (await request.json()) as {
      username: string;
      email: string;
      status?: string;
    };

    // 验证用户名和邮箱是否已存在
    const existingUser = mockUsers.find(
      (u) => u.username === newUser.username || u.email === newUser.email
    );

    if (existingUser) {
      return HttpResponse.json(
        {
          success: false,
          message: "用户名或邮箱已存在",
        },
        { status: 400 }
      );
    }

    const user = {
      id: nextUserId++,
      username: newUser.username,
      email: newUser.email,
      status: newUser.status || "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockUsers.push(user);

    return HttpResponse.json({
      success: true,
      data: user,
      message: "用户创建成功",
    });
  }),

  // 更新用户信息
  http.put("/api/users/:id", async ({ params, request }) => {
    const { id } = params;
    const updateData = (await request.json()) as {
      username?: string;
      email?: string;
      status?: string;
    };

    const userIndex = mockUsers.findIndex(
      (u) => u.id === parseInt(id as string)
    );

    if (userIndex === -1) {
      return HttpResponse.json(
        {
          success: false,
          message: "用户不存在",
        },
        { status: 404 }
      );
    }

    // 检查用户名和邮箱是否与其他用户冲突
    if (updateData.username || updateData.email) {
      const conflictUser = mockUsers.find(
        (u, index) =>
          index !== userIndex &&
          (u.username === updateData.username || u.email === updateData.email)
      );

      if (conflictUser) {
        return HttpResponse.json(
          {
            success: false,
            message: "用户名或邮箱与其他用户冲突",
          },
          { status: 400 }
        );
      }
    }

    // 更新用户信息
    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    return HttpResponse.json({
      success: true,
      data: mockUsers[userIndex],
      message: "用户信息更新成功",
    });
  }),

  // 删除用户
  http.delete("/api/users/:id", ({ params }) => {
    const { id } = params;
    const userIndex = mockUsers.findIndex(
      (u) => u.id === parseInt(id as string)
    );

    if (userIndex === -1) {
      return HttpResponse.json(
        {
          success: false,
          message: "用户不存在",
        },
        { status: 404 }
      );
    }

    const deletedUser = mockUsers.splice(userIndex, 1)[0];

    return HttpResponse.json({
      success: true,
      data: deletedUser,
      message: "用户删除成功",
    });
  }),

  // 批量删除用户
  http.delete("/api/users", async ({ request }) => {
    const { ids } = (await request.json()) as { ids: number[] };

    const deletedUsers = [];
    for (let i = mockUsers.length - 1; i >= 0; i--) {
      if (ids.includes(mockUsers[i].id)) {
        deletedUsers.push(...mockUsers.splice(i, 1));
      }
    }

    return HttpResponse.json({
      success: true,
      data: deletedUsers,
      message: `成功删除 ${deletedUsers.length} 个用户`,
    });
  }),

  // 切换用户状态
  http.patch("/api/users/:id/status", async ({ params, request }) => {
    const { id } = params;
    const { status } = (await request.json()) as { status: string };

    const userIndex = mockUsers.findIndex(
      (u) => u.id === parseInt(id as string)
    );

    if (userIndex === -1) {
      return HttpResponse.json(
        {
          success: false,
          message: "用户不存在",
        },
        { status: 404 }
      );
    }

    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      status,
      updatedAt: new Date().toISOString(),
    };

    return HttpResponse.json({
      success: true,
      data: mockUsers[userIndex],
      message: "用户状态更新成功",
    });
  }),
];
