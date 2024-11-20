import React, { useEffect, useState } from "react";
import GeneralInfoForm from "./views/GeneralInfoForm";
import SurveyQuestion from "./views/SurveyQuestions";
import IntroductionPage from "./views/IntroductionPage";
import EndPage from "./views/EndPage";

// Define the types for the data
type GeneralInfo = {
  name: string;
  surname: string;
  age: string;
  profession: string;
  codingFrequency: string;
};

type SurveyQuestionResponse = {
  questions: { question: string; answer: string }[];
};

// Union type for the `data` parameter in handleNext
type HandleNextData = GeneralInfo | SurveyQuestionResponse;

const Survey: React.FC = () => {
  const [currentView, setCurrentView] = useState("introduction");
  const [surveyData, setSurveyData] = useState<{
    generalInfo: GeneralInfo | null;
    questions: { question: string; answer: string }[];
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
      case "generalInfo":
        setSurveyData((prev) => ({
          ...prev,
          generalInfo: data as GeneralInfo,
        }));
        setCurrentView("surveyQuestion");
        break;

      case "surveyQuestion":
        setSurveyData((prev) => ({
          ...prev,
          questions: (data as SurveyQuestionResponse).questions,
        }));

        // Clear local storage after submission
        localStorage.removeItem("surveyData");

        setCurrentView("end");
        break;

      default:
        break;
    }
  };

  const renderView = () => {
    switch (currentView) {
      case "introduction":
        return (
          <IntroductionPage onNext={() => setCurrentView("generalInfo")} />
        );
      case "generalInfo":
        return (
          <GeneralInfoForm onSubmit={(data: GeneralInfo) => handleNext(data)} />
        );
      case "surveyQuestion":
        return (
          <SurveyQuestion
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
      {/* Debugging: Uncomment to see the collected survey data */}
      {/* <pre>{JSON.stringify(surveyData, null, 2)}</pre> */}
    </div>
  );
};

export default Survey;
