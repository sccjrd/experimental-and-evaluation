import React, { useEffect, useState } from "react";
import { GeneralInfo } from "../types"; // Import the shared type
import GeneralInfoForm from "./views/GeneralInfoForm";
import SurveyQuestions from "./views/SurveyQuestions";
import IntroductionPage from "./views/IntroductionPage";
import EndPage from "./views/EndPage";
import TryQuestionPage from "./views/TryQuestionPage"; // Import the new TryQuestionPage component

// Define types for the data
type SurveyQuestionResponse = {
  responses: {
    originalIndex: number; // Track the original question order
    sentence: string;
    identifier: string;
    trials: number; // Number of attempts
    responseTime: number;
  }[];
};

// Union type for the `data` parameter in handleNext
type HandleNextData = GeneralInfo | SurveyQuestionResponse;

const Survey: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    "introduction" | "tryQuestion" | "generalInfo" | "surveyQuestion" | "end"
  >("introduction");
  const [surveyData, setSurveyData] = useState<{
    generalInfo: GeneralInfo | null;
    questions: {
      originalIndex: number;
      sentence: string;
      identifier: string;
      trials: number;
      responseTime: number;
    }[];
  }>(() => {
    // Load survey data from local storage if available
    const savedData = localStorage.getItem("surveyData");
    return savedData
      ? JSON.parse(savedData)
      : { generalInfo: null, questions: [] };
  });

  useEffect(() => {
    // Save survey data to local storage whenever it changes
    localStorage.setItem("surveyData", JSON.stringify(surveyData));
  }, [surveyData]);

  const handleNext = (data: HandleNextData) => {
    switch (currentView) {
      case "introduction": {
        setCurrentView("tryQuestion");
        break;
      }
      case "tryQuestion": {
        setCurrentView("generalInfo");
        break;
      }
      case "generalInfo": {
        // Process and save general information
        const generalInfo = data as GeneralInfo;
        setSurveyData((prev) => ({
          ...prev,
          generalInfo,
        }));
        setCurrentView("surveyQuestion");
        break;
      }
      case "surveyQuestion": {
        // Process survey question responses
        const surveyQuestionResponse = data as SurveyQuestionResponse;
        const questions = surveyQuestionResponse.responses.map((response) => ({
          originalIndex: response.originalIndex,
          sentence: response.sentence,
          identifier: response.identifier,
          trials: response.trials,
          responseTime: response.responseTime,
        }));

        setSurveyData((prev) => ({
          ...prev,
          questions,
        }));

        // Prepare payload for backend
        const payload = {
          generalInfo: surveyData.generalInfo,
          responses: surveyQuestionResponse.responses,
        };

        // Send data to backend
        fetch(`${import.meta.env.VITE_API_BASE_URL}/save-responses`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        // Clear local storage after submission
        localStorage.removeItem("surveyData");

        setCurrentView("end");
        break;
      }
      default:
        break;
    }
  };

  const renderView = () => {
    switch (currentView) {
      case "introduction":
        return (
          <IntroductionPage onNext={() => setCurrentView("tryQuestion")} />
        );
      case "tryQuestion":
        return <TryQuestionPage onNext={() => setCurrentView("generalInfo")} />;
      case "generalInfo":
        return <GeneralInfoForm onSubmit={handleNext} />;
      case "surveyQuestion":
        return (
          <SurveyQuestions
            onSubmit={(data: SurveyQuestionResponse) => handleNext(data)}
          />
        );
      case "end":
        return <EndPage />;
      default:
        return <div>Unknown view</div>;
    }
  };

  return (
    <div className="survey-container">
      {renderView()}
      {/* Uncomment this for debugging */}
      {/* <pre>{JSON.stringify(surveyData, null, 2)}</pre> */}
    </div>
  );
};

export default Survey;
