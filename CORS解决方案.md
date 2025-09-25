# CORS解决方案说明

## 问题描述
浏览器出现CORS错误，无法直接访问豆包AI API。

## 解决方案：Vite代理（推荐）
已配置Vite代理，将本地请求转发到豆包AI API：

```typescript
// vite.config.ts
proxy: {
  '/api': {
    target: 'https://ark.cn-beijing.volces.com',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '/api'),
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  }
}
```

### 使用方法
1. 确保Vite开发服务器已启动：`npm run dev`
2. AI分析请求会自动通过代理转发到豆包AI
3. 前端代码使用相对路径：`/api/v3/chat/completions`

### 优点
- ✅ 无需额外服务器
- ✅ 配置简单
- ✅ 开发环境专用
- ✅ 自动处理CORS

## 环境变量配置
创建.env.local文件配置API密钥：
```
VITE_DOUBAO_API_KEY=your_api_key_here
VITE_DOUBAO_API_URL=/api/v3/chat/completions
VITE_DOUBAO_MODEL_NAME=doubao-seed-1-6-flash-250828
```

## 错误排查
如果仍有问题：
1. 检查浏览器控制台网络请求
2. 确认Vite代理配置是否正确
3. 验证API密钥是否有效
4. 查看Vite开发服务器日志