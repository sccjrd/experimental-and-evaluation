import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface SurveyQuestionProps {
  onSubmit: (data: {
    responses: {
      sentence: string;
      identifier: string;
      selected: string;
      isCorrect: boolean;
      responseTime: number;
    }[];
  }) => void;
}

const sentences = [
  "move south",
  "jump high",
  "run fast",
  "turn left",
  "stand tall",
];
const identifierStyles = ["camelCase", "kebab-case"]; // Identifier styles

const SurveyQuestions: React.FC<SurveyQuestionProps> = ({ onSubmit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<
    {
      sentence: string;
      identifier: string;
      selected: string;
      isCorrect: boolean;
      responseTime: number;
    }[]
  >([]);
  const [startTime, setStartTime] = useState<number>(0);

  // Shuffle questions and keep their original indices
  const [shuffledIndices] = useState(() => {
    const indices = Array.from(
      { length: sentences.length * identifierStyles.length },
      (_, i) => i
    );
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  });

  const totalQuestions = sentences.length * identifierStyles.length;

  useEffect(() => {
    // Start timing when the question loads
    setStartTime(Date.now());
  }, [currentIndex]);

  const generateIdentifiers = (sentence: string, style: string) => {
    const words = sentence.split(" ");
    const correctIdentifier =
      style === "camelCase"
        ? words[0] + words[1][0].toUpperCase() + words[1].slice(1)
        : words.join("-");

    // Generate unique distractons
    const distractors = new Set<string>();
    while (distractors.size < 3) {
      const randomWords = [...words].map((word) =>
        word.slice(0, Math.max(1, Math.random() * word.length))
      );
      const distractor =
        style === "camelCase"
          ? randomWords[0] +
            randomWords[1][0].toUpperCase() +
            randomWords[1].slice(1)
          : randomWords.join("-");
      if (distractor !== correctIdentifier) {
        distractors.add(distractor);
      }
    }

    // Combine correct answer and distractors
    const options = [correctIdentifier, ...Array.from(distractors)];

    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    return { correctIdentifier, options };
  };

  const handleAnswer = (selected: string) => {
    const actualIndex = shuffledIndices[currentIndex];
    const sentenceIndex = Math.floor(actualIndex / identifierStyles.length);
    const styleIndex = actualIndex % identifierStyles.length;

    const sentence = sentences[sentenceIndex];
    const style = identifierStyles[styleIndex];
    const { correctIdentifier } = generateIdentifiers(sentence, style);

    const isCorrect = selected === correctIdentifier;
    const responseTime = Date.now() - startTime;

    setResponses((prev) => [
      ...prev,
      {
        sentence,
        identifier: correctIdentifier,
        selected,
        isCorrect,
        responseTime,
      },
    ]);

    // Move to the next question or finish
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // console.log("Survey completed. Responses:", responses);
      // console.log("Shuffled Indices:", shuffledIndices);
      onSubmit({ responses });
    }
  };

  const actualIndex = shuffledIndices[currentIndex];
  const sentenceIndex = Math.floor(actualIndex / identifierStyles.length);
  const styleIndex = actualIndex % identifierStyles.length;

  const sentence = sentences[sentenceIndex];
  const style = identifierStyles[styleIndex];
  const { options } = generateIdentifiers(sentence, style);

  return (
    <div className="space-y-4 text-center">
      <h2 className="text-xl font-bold">
        Question {currentIndex + 1} of {totalQuestions}
      </h2>
      <p className="text-lg">Identify the sentence:</p>
      <p className="font-mono text-lg">{sentence}</p>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <Button key={option} onClick={() => handleAnswer(option)}>
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SurveyQuestions;
