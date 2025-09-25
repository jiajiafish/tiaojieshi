import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent  } from "./ui/card";
import { Badge } from "./ui/badge";
import { Loader2, Heart, Home } from "lucide-react";
import { analyzeMediation } from "../services/aiAnalysis";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ResultPageProps {
  recordings: { person1: string; person2: string };
  onHome: () => void;
  onNewMediation: () => void;
}

export function ResultPage({ recordings, onHome, onNewMediation }: ResultPageProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [aiResponse, setAiResponse] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // 真实的AI分析过程
  useEffect(() => {
    const analyzeRecordings = async () => {
      try {
        setIsAnalyzing(true);
        setError(null);
        
        const result = await analyzeMediation({
          person1: recordings.person1,
          person2: recordings.person2
        });
        
        setAiResponse(result);
      } catch (err) {
        console.error('分析失败:', err);
        setError('AI分析遇到了问题，请稍后重试');
      } finally {
        setIsAnalyzing(false);
      }
    };

    analyzeRecordings();
  }, [recordings]);

  // 如果没有分析结果且不在分析中，显示错误状态
  if (!isAnalyzing && !aiResponse && error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md border-none shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">😅</div>
            <h2 className="text-xl mb-2 text-red-600">AI分析遇到了问题</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="space-y-3">
              <Button
                onClick={() => window.location.reload()}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl"
              >
                重新分析
              </Button>
              <Button
                onClick={onHome}
                variant="outline"
                className="w-full border-2 border-gray-200 hover:bg-gray-50 rounded-xl"
              >
                返回首页
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md border-none shadow-lg">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-12 h-12 animate-spin text-purple-500 mx-auto mb-4" />
            <h2 className="text-xl mb-2">AI调解师正在分析中...</h2>
            <p className="text-gray-600 mb-4">正在连接豆包AI进行智能分析</p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>🔍 分析双方表达内容...</p>
              <p>🧠 理解情感需求...</p>
              <p>💡 生成个性化调解建议...</p>
            </div>
            <div className="mt-4 text-xs text-gray-400">
              使用豆包AI大模型进行分析
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center pt-4">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl text-gray-800 mb-2">AI调解报告</h1>
          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
            豆包AI智能分析
          </Badge>
        </div>

        {/* AI Response Content */}
        <Card className="border-none shadow-lg">
          <CardContent className="p-6">
            <div className="prose prose-sm max-w-none text-gray-700">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {aiResponse}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button
            onClick={onNewMediation}
            className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl"
          >
            再次调解
          </Button>
          
          <Button
            onClick={onHome}
            variant="outline"
            className="w-full h-12 border-2 border-gray-200 hover:bg-gray-50 rounded-xl"
          >
            <Home className="w-4 h-4 mr-2" />
            返回首页
          </Button>
        </div>
      </div>
    </div>
  );
}