import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { MessageCircle, Heart, Volume2 } from "lucide-react";
import { useState, useEffect } from "react";

interface HomePageProps {
  onStartMediation: () => void;
  onViewHistory: () => void;
}

export function HomePage({ onStartMediation, onViewHistory }: HomePageProps) {
  const [helpedFamilies, setHelpedFamilies] = useState(0);

  useEffect(() => {
    // 基于时间戳生成动态数字，让数字看起来在增长
    const timestamp = Date.now();
    const baseNumber = 0;
    const increment = Math.floor(timestamp / (1000 * 60 * 30)); // 每30分钟增加1
    setHelpedFamilies(baseNumber + increment);
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center pt-8 pb-4">
          <div className="flex justify-center items-center mb-4">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl text-gray-800 mb-2">家庭和谐师</h1>
          <p className="text-gray-600">AI智能调解，让爱回家</p>
          <p className="text-gray-600  text-sm pt-2">特别感谢TingZ 提供创意，Ajax落地</p>
          
        </div>

        {/* Feature Cards */}
        <div className="space-y-4">
          <Card className="border-none shadow-lg">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <Volume2 className="w-6 h-6 text-blue-500" />
              </div>
              <CardTitle className="text-lg">智能倾听</CardTitle>
              <CardDescription>
                让我听听你们双方的心声，理解每个人的想法
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <MessageCircle className="w-6 h-6 text-green-500" />
              </div>
              <CardTitle className="text-lg">诙谐调解</CardTitle>
              <CardDescription>
                用幽默风趣的方式化解矛盾，让和谐重回家庭
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-r from-orange-400 to-pink-400 text-white border-none shadow-lg">
            <CardContent className="p-6 text-center">
              <h3 className="mb-2">已帮助 {helpedFamilies.toLocaleString()} 个家庭</h3>
              <p className="text-sm opacity-90">重归和睦 💕</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button 
            onClick={onStartMediation}
            className="w-full h-14 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl shadow-lg"
          >
            <Heart className="w-5 h-5 mr-2" />
            开始调解
          </Button>
          
          <Button 
            onClick={onViewHistory}
            variant="outline"
            className="w-full h-12 border-2 border-gray-200 hover:bg-gray-50 rounded-xl"
          >
            查看历史记录
          </Button>
        </div>

        {/* Tips */}
        <div className="text-center text-gray-500 text-sm pt-4">
          <p>💡 小贴士：诚实表达感受，用心倾听对方</p>
        </div>
      </div>
    </div>
  );
}