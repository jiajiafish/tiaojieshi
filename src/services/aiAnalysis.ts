interface AIAnalysisRequest {
  person1: string;
  person2: string;
}



const API_KEY = '15e0756e-78c1-4e4f-ac09-894e377f34c3';
const API_URL = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';
const MODEL_NAME = 'doubao-seed-1-6-flash-250828';

export async function analyzeMediation(request: AIAnalysisRequest): Promise<string> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: '你是一个特别个性的调解员，根据用户的表达，帮用户缓解矛盾，你的主要特点是幽默风趣。你的回答要包含三个方面，分析摘要，关键洞察，和谐建议，最后给出祝福。'
              },
              {
                type: 'text',
                text: `第一位用户的表达：${request.person1}`
              },
              {
                type: 'text',
                text: `第二位用户的表达：${request.person2}`
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API调用失败: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || '';
    
    // 返回的是markdown格式的字符串
    return aiResponse;
    
  } catch (error) {
    console.error('AI分析失败:', error);
    // 如果API调用失败，返回默认的模拟数据
    return "经过AI分析，发现你们的矛盾主要源于沟通方式和期望值的差异。\n\n" +
    "幽默介绍：哎呀呀，看来咱们这对小夫妻又在上演《甄嬛传》了呢！😄 别急别急，和谐师在此，专治各种不服！\n\n" +
    "核心问题：沟通频率不匹配 - 一个希望多聊天，一个觉得太吵闹\n\n" +
    "情感需求：双方都渴望被理解，但表达方式不同\n\n" +
    "解决方向：建立固定的沟通时间，互相尊重个人空间\n\n" +
    "建议：建议每天晚上8-9点为「专属聊天时光」，这个时间段专心交流，其他时间各自忙碌也OK！\n\n" +
    "记住哦，恋爱就像泡茶，太急了会苦，太慢了会淡，刚刚好才最香甜！你们一定可以找到属于自己的节奏！💕";
  }
}


