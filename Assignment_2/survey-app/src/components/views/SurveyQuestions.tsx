import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface SurveyQuestionProps {
  onSubmit: (data: {
    responses: {
      originalIndex: number; // Track the original question order
      sentence: string;
      identifier: string;
      trials: number; // Number of trials before the correct answer
      responseTime: number; // Time taken to answer
    }[];
  }) => void;
}

// Predefined questions with index to track the original order
const predefinedQuestions = [
  {
    index: 0,
    sentence: "move south",
    style: "camelCase",
    correctIdentifier: "moveSouth",
    distractors: ["moveSource", "moverSound", "moreSouth"],
  },
  {
    index: 1,
    sentence: "move south",
    style: "kebab-case",
    correctIdentifier: "move-south",
    distractors: ["move-source", "mover-sound", "more-south"],
  },
  {
    index: 2,
    sentence: "jump high",
    style: "camelCase",
    correctIdentifier: "jumpHigh",
    distractors: ["jumpSource", "jumpsSound", "jumpMore"],
  },
  {
    index: 3,
    sentence: "jump high",
    style: "kebab-case",
    correctIdentifier: "jump-high",
    distractors: ["jump-source", "jumps-sound", "jump-more"],
  },
  {
    index: 4,
    sentence: "run fast",
    style: "camelCase",
    correctIdentifier: "runFast",
    distractors: ["runFastly", "runsSource", "runSlow"],
  },
  {
    index: 5,
    sentence: "run fast",
    style: "kebab-case",
    correctIdentifier: "run-fast",
    distractors: ["run-fastly", "runs-source", "run-slow"],
  },
  {
    index: 6,
    sentence: "turn left",
    style: "camelCase",
    correctIdentifier: "turnLeft",
    distractors: ["turnRight", "turnSlow", "turnLift"],
  },
  {
    index: 7,
    sentence: "turn left",
    style: "kebab-case",
    correctIdentifier: "turn-left",
    distractors: ["turn-right", "turn-slow", "turn-lift"],
  },
  {
    index: 8,
    sentence: "stand tall",
    style: "camelCase",
    correctIdentifier: "standTall",
    distractors: ["standSlow", "standFall", "standsHigh"],
  },
  {
    index: 9,
    sentence: "stand tall",
    style: "kebab-case",
    correctIdentifier: "stand-tall",
    distractors: ["stand-slow", "stand-fall", "stands-high"],
  },
  {
    index: 10,
    sentence: "sit down",
    style: "camelCase",
    correctIdentifier: "sitDown",
    distractors: ["sitUp", "sitsFast", "sittingDown"],
  },
  {
    index: 11,
    sentence: "sit down",
    style: "kebab-case",
    correctIdentifier: "sit-down",
    distractors: ["sit-up", "sits-fast", "sitting-down"],
  },
  {
    index: 12,
    sentence: "walk forward",
    style: "camelCase",
    correctIdentifier: "walkForward",
    distractors: ["walkFast", "walkingForward", "walksForward"],
  },
  {
    index: 13,
    sentence: "walk forward",
    style: "kebab-case",
    correctIdentifier: "walk-forward",
    distractors: ["walk-fast", "walking-forward", "walks-forward"],
  },
  {
    index: 14,
    sentence: "look back",
    style: "camelCase",
    correctIdentifier: "lookBack",
    distractors: ["looksBack", "lookingForward", "lookBehind"],
  },
  {
    index: 15,
    sentence: "look back",
    style: "kebab-case",
    correctIdentifier: "look-back",
    distractors: ["looks-back", "looking-forward", "look-behind"],
  },
  {
    index: 16,
    sentence: "climb up",
    style: "camelCase",
    correctIdentifier: "climbUp",
    distractors: ["climbsUp", "climbingFast", "climbSlow"],
  },
  {
    index: 17,
    sentence: "climb up",
    style: "kebab-case",
    correctIdentifier: "climb-up",
    distractors: ["climbs-up", "climbing-fast", "climb-slow"],
  },
  {
    index: 18,
    sentence: "push forward",
    style: "camelCase",
    correctIdentifier: "pushForward",
    distractors: ["pushBack", "pushingFast", "pushesForward"],
  },
  {
    index: 19,
    sentence: "push forward",
    style: "kebab-case",
    correctIdentifier: "push-forward",
    distractors: ["push-back", "pushing-fast", "pushes-forward"],
  },
  {
    index: 20,
    sentence: "pull back",
    style: "camelCase",
    correctIdentifier: "pullBack",
    distractors: ["pullForward", "pullingFast", "pullsBack"],
  },
  {
    index: 21,
    sentence: "pull back",
    style: "kebab-case",
    correctIdentifier: "pull-back",
    distractors: ["pull-forward", "pulling-fast", "pulls-back"],
  },
];

const SurveyQuestions: React.FC<SurveyQuestionProps> = ({ onSubmit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<
    {
      originalIndex: number; // Track the original question index
      sentence: string;
      identifier: string;
      trials: number; // Number of trials
      responseTime: number; // Time taken
    }[]
  >([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [trials, setTrials] = useState<number>(0); // Count the number of clicks
  const [disabledOptions, setDisabledOptions] = useState<string[]>([]); // Track incorrect answers
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  // Store shuffled options for each question
  const [shuffledQuestions] = useState(() =>
    predefinedQuestions.map((question) => {
      const options = [...question.distractors, question.correctIdentifier];

      // Shuffle the options once and keep them fixed for the question
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }

      return { ...question, options };
    })
  );

  useEffect(() => {
    // Reset state when a new question loads
    setStartTime(Date.now());
    setTrials(0);
    setDisabledOptions([]);
    setFeedbackMessage(""); // Clear the feedback message
  }, [currentIndex]);

  const handleAnswer = (selected: string) => {
    const question = shuffledQuestions[currentIndex];
    const { index: originalIndex, sentence, correctIdentifier } = question;

    if (selected === correctIdentifier) {
      // Correct answer
      const responseTime = Date.now() - startTime;

      // Save the response
      setResponses((prev) => [
        ...prev,
        {
          originalIndex,
          sentence,
          identifier: correctIdentifier,
          trials: trials + 1, // Include the current attempt
          responseTime,
        },
      ]);

      // Proceed to the next question
      if (currentIndex + 1 < shuffledQuestions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        onSubmit({ responses });
      }
    } else {
      // Incorrect answer
      setDisabledOptions((prev) => [...prev, selected]); // Disable the clicked button
      setTrials((prev) => prev + 1); // Increment trial count
      setFeedbackMessage("Wrong identifier, try again...");
    }
  };

  const currentQuestion = shuffledQuestions[currentIndex];

  return (
    <div className="space-y-4 text-center">
      <h2 className="text-xl font-bold">
        Question {currentIndex + 1} of {shuffledQuestions.length}
      </h2>
      <p className="text-lg">Identify the correct identifier:</p>
      <p className="font-mono text-lg">{currentQuestion.sentence}</p>
      <div className="grid grid-cols-2 gap-4">
        {currentQuestion.options.map((option) => (
          <Button
            key={option}
            onClick={() => handleAnswer(option)}
            disabled={disabledOptions.includes(option)} // Disable if already clicked
            className={`${
              disabledOptions.includes(option)
                ? "bg-red-500 text-white " // Red for incorrect answers
                : option === currentQuestion.correctIdentifier &&
                  disabledOptions.includes(option)
                ? "bg-green-500 text-white" // Green for correct answer
                : ""
            }`}
          >
            {option}
          </Button>
        ))}
      </div>
      <div className="mt-4 min-h-[30px]">
        {feedbackMessage ? (
          <p className="text-lg text-red-400">{feedbackMessage}</p>
        ) : (
          <p className="invisible">&nbsp;</p>
        )}
      </div>
    </div>
  );
};

export default SurveyQuestions;
