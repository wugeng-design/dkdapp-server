# DKDApp Server

DKDApp 后端服务，基于 NestJS 框架构建。

## 技术栈

- **框架**: NestJS 10.x
- **语言**: TypeScript
- **数据库**: MongoDB
- **缓存**: Redis
- **认证**: JWT

## 功能模块

- **用户模块**: 用户注册、登录、信息管理
- **认证模块**: 验证码发送、手机号登录、JWT认证

## 快速开始

### 环境要求

- Node.js >= 18.x
- MongoDB >= 6.x
- Redis >= 7.x

### 安装依赖

```bash
npm install
```

### 配置环境变量

复制 `.env` 文件并修改配置：

```bash
cp .env.example .env
```

### 开发模式

```bash
npm run start:dev
```

服务将在 `http://localhost:3000` 启动。

### 生产构建

```bash
npm run build
npm run start:prod
```

## API 接口

### 认证接口

| 接口 | 方法 | 描述 |
|------|------|------|
| `/auth/send-code` | POST | 发送验证码 |
| `/auth/login` | POST | 手机号登录 |
| `/auth/register` | POST | 用户注册 |

### 用户接口

| 接口 | 方法 | 描述 |
|------|------|------|
| `/users/profile` | GET | 获取用户信息 |
| `/users/profile` | PATCH | 更新用户信息 |
| `/users/profile` | DELETE | 删除用户 |

## 腾讯云部署指南

### 方案一：Serverless 云函数

1. **创建云函数**
   - 登录腾讯云控制台
   - 进入云函数服务
   - 创建新函数，选择 Node.js 18 运行时

2. **配置环境变量**
   ```
   MONGODB_URI=mongodb://<username>:<password>@<host>:<port>/dkdapp
   REDIS_URL=redis://<host>:<port>
   JWT_SECRET=<your-secret>
   ```

3. **部署代码**
   ```bash
   npm run build
   # 将 dist 目录和 package.json 打包上传
   ```

### 方案二：云服务器 CVM

1. **创建 CVM 实例**
   - 选择 Ubuntu/Debian 系统
   - 配置安全组，开放 3000 端口

2. **安装依赖**
   ```bash
   sudo apt update
   sudo apt install nodejs npm mongodb redis-server
   ```

3. **部署应用**
   ```bash
   git clone <repository-url>
   cd dkdapp-server
   npm install
   npm run build
   ```

4. **配置 PM2**
   ```bash
   npm install -g pm2
   pm2 start dist/main.js --name dkdapp-server
   ```

## 目录结构

```
src/
├── auth/           # 认证模块
│   ├── controllers/
│   ├── services/
│   ├── dto/
│   ├── guards/
│   ├── strategies/
│   └── decorators/
├── user/           # 用户模块
│   ├── controllers/
│   ├── services/
│   ├── dto/
│   └── schemas/
├── app.module.ts   # 主模块
└── main.ts         # 入口文件
```

## License

MIT