import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Mic, MicOff, Play, Pause, RotateCcw, ArrowRight } from "lucide-react";

interface RecordingPageProps {
  onComplete: (recordings: { person1: string; person2: string }) => void;
  onBack: () => void;
}

interface Recording {
  isRecording: boolean;
  duration: number;
  content: string;
  transcript: string;
  interimTranscript: string;
}

interface PersonRecording {
  id: 1 | 2;
  name: string;
  color: 'blue' | 'purple';
  recording: Recording;
  setRecording: (recording: Recording) => void;
}

export function RecordingPage({ onComplete, onBack }: RecordingPageProps) {
  const [currentPerson, setCurrentPerson] = useState<1 | 2>(1);
  const [person1Recording, setPerson1Recording] = useState<Recording>({
    isRecording: false,
    duration: 0,
    content: "",
    transcript: "",
    interimTranscript: ""
  });
  const [person2Recording, setPerson2Recording] = useState<Recording>({
    isRecording: false,
    duration: 0,
    content: "",
    transcript: "",
    interimTranscript: ""
  });
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isSpeechRecognitionSupported, setIsSpeechRecognitionSupported] = useState(false);

  // 创建更清晰的人员配置
  const personConfigs: PersonRecording[] = [
    {
      id: 1,
      name: '第一位',
      color: 'blue',
      recording: person1Recording,
      setRecording: setPerson1Recording
    },
    {
      id: 2,
      name: '第二位',
      color: 'purple',
      recording: person2Recording,
      setRecording: setPerson2Recording
    }
  ];

  const currentPersonConfig = personConfigs.find(p => p.id === currentPerson)!;

  // 初始化语音识别
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSpeechRecognitionSupported(true);
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'zh-CN';
      
      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        // 获取当前人员配置（解决闭包问题）
        const currentPersonId = currentPerson;
        const currentConfig = personConfigs.find(p => p.id === currentPersonId);
        if (currentConfig) {
          currentConfig.setRecording(prev => {
            // 只添加最终的识别结果，避免重复
            const newTranscript = finalTranscript ? 
              (prev.transcript + ' ' + finalTranscript).trim() : 
              prev.transcript;
            
            return {
              ...prev,
              transcript: newTranscript,
              interimTranscript: interimTranscript
            };
          });
        }
      };
      
      recognition.onerror = (event: any) => {
        console.error('语音识别错误:', event.error);
      };
      
      setRecognition(recognition);
    }
  }, [currentPerson]); // 添加currentPerson依赖，确保回调函数获取最新值

  const startRecording = () => {
    const { recording, setRecording } = currentPersonConfig;
    setRecording({ ...recording, isRecording: true });
    
    // 开始语音识别
    if (recognition) {
      recognition.start();
    }
    
    // 模拟录音计时
    const interval = setInterval(() => {
      setRecording(prev => {
        if (!prev.isRecording) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, duration: prev.duration + 1 };
      });
    }, 1000);
  };

  const stopRecording = () => {
    const { recording, setRecording } = currentPersonConfig;
    
    // 停止语音识别
    if (recognition) {
      recognition.stop();
    }
    
    // 清理临时转录文本，只保留最终结果
    setRecording({ 
      ...recording, 
      isRecording: false,
      interimTranscript: "",
      content: recording.transcript ? recording.transcript : `录音内容 ${recording.duration}秒`
    });
  };

  const resetRecording = () => {
    const { setRecording } = currentPersonConfig;
    setRecording({
      isRecording: false,
      duration: 0,
      content: "",
      transcript: "",
      interimTranscript: ""
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const canProceed = person1Recording.content && person2Recording.content;

  // 获取颜色相关的样式配置
  const getColorStyles = (color: 'blue' | 'purple') => {
    if (color === 'blue') {
      return {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        dot: 'bg-blue-500',
        text: 'text-blue-700',
        title: 'text-blue-700'
      };
    } else {
      return {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        dot: 'bg-purple-500',
        text: 'text-purple-700',
        title: 'text-purple-700'
      };
    }
  };

  const handleComplete = () => {
    onComplete({
      person1: person1Recording.transcript || person1Recording.content,
      person2: person2Recording.transcript || person2Recording.content
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <Button variant="ghost" onClick={onBack}>
            ← 返回
          </Button>
          <h1 className="text-xl">倾听双方心声</h1>
          <div></div>
        </div>

        {/* Person Switch */}
        <div className="flex bg-white rounded-xl p-1 mb-6 shadow-sm">
          {personConfigs.map((person) => (
            <Button
              key={person.id}
              variant={currentPerson === person.id ? "default" : "ghost"}
              className="flex-1 rounded-lg"
              onClick={() => setCurrentPerson(person.id)}
            >
              {person.name} {person.recording.content && "✓"}
            </Button>
          ))}
        </div>

        {/* Current Person's Recording Preview */}
        {currentPersonConfig.recording.content && (
          <Card className={`mb-6 ${getColorStyles(currentPersonConfig.color).bg} ${getColorStyles(currentPersonConfig.color).border}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-3 h-3 ${getColorStyles(currentPersonConfig.color).dot} rounded-full`}></div>
                <h3 className={`text-sm font-medium ${getColorStyles(currentPersonConfig.color).title}`}>
                  {currentPersonConfig.name}录音转录
                </h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {currentPersonConfig.recording.transcript || currentPersonConfig.recording.content}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Current Recording */}
        <Card className="mb-6 border-none shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getColorStyles(currentPersonConfig.color).dot}`}></div>
              {currentPersonConfig.name}的表达时间
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Timer Display */}
            <div className="text-center">
              <div className="text-4xl mb-2 font-mono">
                {formatTime(currentPersonConfig.recording.duration)}
              </div>
              <Badge variant={currentPersonConfig.recording.isRecording ? "destructive" : "secondary"}>
                {currentPersonConfig.recording.isRecording ? "录音中..." : "准备录音"}
              </Badge>
            </div>

            {/* Recording Controls */}
            <div className="flex justify-center space-x-4">
              {!currentPersonConfig.recording.isRecording ? (
                <Button
                  onClick={startRecording}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full w-16 h-16"
                >
                  <Mic className="w-6 h-6" />
                </Button>
              ) : (
                <Button
                  onClick={stopRecording}
                  className="bg-gray-500 hover:bg-gray-600 text-white rounded-full w-16 h-16"
                >
                  <MicOff className="w-6 h-6" />
                </Button>
              )}

              {currentPersonConfig.recording.content && (
                <Button
                  onClick={resetRecording}
                  variant="outline"
                  className="rounded-full w-12 h-12"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Recording Status */}
            {currentPersonConfig.recording.content && (
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-green-700">✓ 录音完成</p>
                <p className="text-sm text-green-600">{currentPersonConfig.recording.content}</p>
              </div>
            )}

            {/* Real-time Transcript */}
            {currentPersonConfig.recording.isRecording && (currentPersonConfig.recording.transcript || currentPersonConfig.recording.interimTranscript) && (
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700 mb-1">🎤 实时识别:</p>
                <p className="text-sm text-gray-700">
                  {currentPersonConfig.recording.transcript}
                  {currentPersonConfig.recording.interimTranscript && (
                    <span className="text-blue-500 opacity-70">{currentPersonConfig.recording.interimTranscript}</span>
                  )}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mb-6 bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <h3 className="mb-2">💡 录音小贴士</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 请在安静的环境下录音</li>
              <li>• 真诚表达自己的想法和感受</li>
              <li>• 建议录音时长：30秒-2分钟</li>
              <li>• 避免指责，多说自己的感受</li>
            </ul>
            {!isSpeechRecognitionSupported && (
              <div className="mt-3 p-2 bg-red-50 rounded border border-red-200">
                <p className="text-xs text-red-600">⚠️ 您的浏览器不支持语音识别功能，请使用Chrome、Edge或Safari浏览器</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Complete Button */}
        {canProceed && (
          <Button
            onClick={handleComplete}
            className="w-full h-14 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white rounded-xl shadow-lg"
          >
            开始AI调解
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}