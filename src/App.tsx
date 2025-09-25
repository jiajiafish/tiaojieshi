import { useState } from "react";
import { HomePage } from "./components/HomePage";
import { RecordingPage } from "./components/RecordingPage";
import { ResultPage } from "./components/ResultPage";
import { HistoryPage } from "./components/HistoryPage";

type Page = "home" | "recording" | "result" | "history";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [recordings, setRecordings] = useState<{ person1: string; person2: string } | null>(null);

  const handleStartMediation = () => {
    setCurrentPage("recording");
  };

  const handleRecordingComplete = (recordingData: { person1: string; person2: string }) => {
    setRecordings(recordingData);
    setCurrentPage("result");
  };

  const handleViewHistory = () => {
    setCurrentPage("history");
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
    setRecordings(null);
  };

  const handleNewMediation = () => {
    setRecordings(null);
    setCurrentPage("recording");
  };

  const handleBackFromRecording = () => {
    setCurrentPage("home");
  };

  const handleBackFromHistory = () => {
    setCurrentPage("home");
  };

  return (
    <div className="min-h-screen">
      {currentPage === "home" && (
        <HomePage 
          onStartMediation={handleStartMediation}
          onViewHistory={handleViewHistory}
        />
      )}
      
      {currentPage === "recording" && (
        <RecordingPage 
          onComplete={handleRecordingComplete}
          onBack={handleBackFromRecording}
        />
      )}
      
      {currentPage === "result" && recordings && (
        <ResultPage 
          recordings={recordings}
          onHome={handleBackToHome}
          onNewMediation={handleNewMediation}
        />
      )}
      
      {currentPage === "history" && (
        <HistoryPage 
          onBack={handleBackFromHistory}
        />
      )}
    </div>
  );
}