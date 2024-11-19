import { useState } from "react";
import Introduction from "./Introduction";
import GeneralInfo from "./GeneralInfo";
import Question from "./Questions";
import ThankYou from "./ThankYou";

const questions = [
  "Question 1?",
  "Question 2?",
  "Question 3?",
  "Question 4?",
  "Question 5?",
  "Question 6?",
  "Question 7?",
  "Question 8?",
  "Question 9?",
  "Question 10?",
];

const Survey = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    age: 0,
    profession: "",
    codingExperience: false,
    answer: "",
  });

  const nextStep = () => setStep(step + 1);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  switch (step) {
    case 0:
      return <Introduction nextStep={nextStep} />;
    case 1:
      return (
        <GeneralInfo
          nextStep={nextStep}
          handleChange={handleChange}
          data={data}
        />
      );
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
      return (
        <Question
          question={questions[step - 2]}
          nextStep={nextStep}
          handleChange={handleChange}
          data={data}
        />
      );
    case 11:
      return <ThankYou />;
    default:
      return <div>Error</div>;
  }
};

export default Survey;
