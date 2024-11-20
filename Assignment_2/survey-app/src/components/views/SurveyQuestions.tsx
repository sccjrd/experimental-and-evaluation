import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface SurveyQuestionProps {
  onSubmit: (data: {
    questions: { question: string; answer: string }[];
  }) => void;
}

const questions = [
  "Do you prefer coffee or tea?",
  "Do you enjoy outdoor activities?",
  "Do you prefer cats or dogs?",
  "Do you like summer more than winter?",
  "Do you enjoy reading books?",
  "Do you prefer watching movies or series?",
  "Do you like traveling?",
  "Do you enjoy cooking?",
  "Do you prefer working in a team?",
  "Do you like trying new foods?",
  // Add more questions as needed
];

const SurveyQuestions: React.FC<SurveyQuestionProps> = ({ onSubmit }) => {
  const [shuffledQuestions, setShuffledQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<
    { question: string; answer: string }[]
  >([]);

  useEffect(() => {
    // Shuffle questions using Fisher-Yates algorithm
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledQuestions(shuffled);
  }, []);

  const handleAnswer = (answer: string) => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];

    // Save the current response
    setResponses((prev) => [...prev, { question: currentQuestion, answer }]);

    // Move to the next question or finish
    if (currentQuestionIndex + 1 < shuffledQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      onSubmit({ questions: responses });
    }
  };

  if (shuffledQuestions.length === 0) return <div>Loading questions...</div>;

  return (
    <div className="space-y-4 text-center">
      <h2 className="text-xl font-bold">
        Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
      </h2>
      <p className="text-lg">{shuffledQuestions[currentQuestionIndex]}</p>
      <div className="flex justify-center gap-4">
        <Button onClick={() => handleAnswer("Yes")}>Yes</Button>
        <Button onClick={() => handleAnswer("No")}>No</Button>
      </div>
    </div>
  );
};

export default SurveyQuestions;
