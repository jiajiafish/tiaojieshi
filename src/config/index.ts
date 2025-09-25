// 应用配置 - 将敏感信息集中管理
export const config = {
  // API配置
  api: {
    // 使用环境变量或默认值
    key: import.meta.env.VITE_DOUBAO_API_KEY || '',
    url: import.meta.env.VITE_DOUBAO_API_URL || '/api/v3/chat/completions',
    model: import.meta.env.VITE_DOUBAO_MODEL_NAME || 'doubao-seed-1-6-flash-250828',
    // 代理目标地址
    proxyTarget: import.meta.env.VITE_PROXY_TARGET || 'https://ark.cn-beijing.volces.com'
  },
  
  // 应用设置
  app: {
    name: import.meta.env.VITE_APP_NAME || '家庭矛盾调解小程序',
    version: '1.0.0'
  },
  
  // 开发模式检测
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD
};

// 验证配置是否完整
export function validateConfig(): boolean {
  if (!config.api.key) {
    console.warn('警告: 未配置 API 密钥，将使用模拟数据');
    return false;
  }
  return true;
}