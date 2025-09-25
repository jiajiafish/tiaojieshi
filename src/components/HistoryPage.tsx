import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { ArrowLeft, Calendar, TrendingUp, Heart, Clock } from "lucide-react";

interface HistoryPageProps {
  onBack: () => void;
}

export function HistoryPage({ onBack }: HistoryPageProps) {
  // 模拟历史记录数据
  const historyRecords = [
    {
      id: 1,
      date: "2024-01-15",
      time: "20:30",
      issue: "关于家务分工的讨论",
      harmonyScore: 85,
      keyResolution: "制定了详细的家务轮班表，双方都很满意",
      status: "已解决"
    },
    {
      id: 2,
      date: "2024-01-10",
      time: "19:15",
      issue: "周末安排意见不一致",
      harmonyScore: 72,
      keyResolution: "达成共识：一个周末宅家，一个周末外出",
      status: "进行中"
    },
    {
      id: 3,
      date: "2024-01-05",
      time: "21:45",
      issue: "关于投资理财的分歧",
      harmonyScore: 78,
      keyResolution: "决定咨询理财顾问，制定长期规划",
      status: "已解决"
    },
    {
      id: 4,
      date: "2023-12-28",
      time: "18:20",
      issue: "过年回哪家的争议",
      harmonyScore: 90,
      keyResolution: "轮流回家，公平合理，皆大欢喜",
      status: "已解决"
    },
    {
      id: 5,
      date: "2023-12-20",
      time: "22:10",
      issue: "工作加班与陪伴平衡",
      harmonyScore: 65,
      keyResolution: "设定了固定的约会日，工作再忙也要保证",
      status: "已解决"
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-700 border-green-200";
    if (score >= 70) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-red-100 text-red-700 border-red-200";
  };

  const getStatusColor = (status: string) => {
    if (status === "已解决") return "bg-green-100 text-green-700 border-green-200";
    return "bg-blue-100 text-blue-700 border-blue-200";
  };

  const averageScore = Math.round(historyRecords.reduce((sum, record) => sum + record.harmonyScore, 0) / historyRecords.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            返回
          </Button>
          <h1 className="text-xl">调解历史</h1>
          <div></div>
        </div>

        {/* Statistics */}
        <Card className="mb-6 border-none shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl mb-1">{historyRecords.length}</div>
                <div className="text-sm opacity-90">总调解次数</div>
              </div>
              <div>
                <div className="text-2xl mb-1">{averageScore}%</div>
                <div className="text-sm opacity-90">平均和谐度</div>
              </div>
              <div>
                <div className="text-2xl mb-1">{historyRecords.filter(r => r.status === "已解决").length}</div>
                <div className="text-sm opacity-90">成功解决</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trend Card */}
        <Card className="mb-6 border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              关系趋势
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Heart className="w-6 h-6 text-red-500" />
              <div>
                <p className="text-sm">你们的关系越来越好了！</p>
                <p className="text-xs text-gray-600">最近3次调解的和谐度都在提升 📈</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* History List */}
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              历史记录
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-96">
              <div className="space-y-4 p-4">
                {historyRecords.map((record) => (
                  <div key={record.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {record.date} {record.time}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getScoreColor(record.harmonyScore)}>
                          {record.harmonyScore}%
                        </Badge>
                        <Badge className={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <h4 className="mb-2">{record.issue}</h4>
                    
                    <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      💡 {record.keyResolution}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="mt-6 bg-amber-50 border-amber-200 border-none shadow-lg">
          <CardContent className="p-4">
            <h4 className="mb-2 flex items-center gap-2">
              <div className="text-lg">💡</div>
              成长小贴士
            </h4>
            <p className="text-sm text-gray-700">
              你们已经成功调解了 {historyRecords.filter(r => r.status === "已解决").length} 次矛盾！
              每一次的沟通都让你们更加了解彼此。继续保持这种积极的态度，相信你们的感情会越来越好！
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}