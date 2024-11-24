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

// const predefinedQuestions = [
//   {
//     sentence: "move south",
//     style: "camelCase",
//     correctIdentifier: "moveSouth",
//     distractors: ["moveSource", "moverSound", "moreSouth"],
//   },
//   {
//     sentence: "move south",
//     style: "kebab-case",
//     correctIdentifier: "move-south",
//     distractors: ["move-source", "mover-sound", "more-south"],
//   },
//   // Add more predefined questions
// ];

const predefinedQuestions = [
  {
    sentence: "move south",
    style: "camelCase",
    correctIdentifier: "moveSouth",
    distractors: ["moveSource", "moverSound", "moreSouth"],
  },
  {
    sentence: "move south",
    style: "kebab-case",
    correctIdentifier: "move-south",
    distractors: ["move-source", "mover-sound", "more-south"],
  },
  {
    sentence: "jump high",
    style: "camelCase",
    correctIdentifier: "jumpHigh",
    distractors: ["jumpSource", "jumpsSound", "jumpMore"],
  },
  {
    sentence: "jump high",
    style: "kebab-case",
    correctIdentifier: "jump-high",
    distractors: ["jump-source", "jumps-sound", "jump-more"],
  },
  {
    sentence: "run fast",
    style: "camelCase",
    correctIdentifier: "runFast",
    distractors: ["runFastly", "runsSource", "runSlow"],
  },
  {
    sentence: "run fast",
    style: "kebab-case",
    correctIdentifier: "run-fast",
    distractors: ["run-fastly", "runs-source", "run-slow"],
  },
  {
    sentence: "turn left",
    style: "camelCase",
    correctIdentifier: "turnLeft",
    distractors: ["turnRight", "turnSlow", "turnLift"],
  },
  {
    sentence: "turn left",
    style: "kebab-case",
    correctIdentifier: "turn-left",
    distractors: ["turn-right", "turn-slow", "turn-lift"],
  },
  {
    sentence: "stand tall",
    style: "camelCase",
    correctIdentifier: "standTall",
    distractors: ["standSlow", "standFall", "standsHigh"],
  },
  {
    sentence: "stand tall",
    style: "kebab-case",
    correctIdentifier: "stand-tall",
    distractors: ["stand-slow", "stand-fall", "stands-high"],
  },
  {
    sentence: "sit down",
    style: "camelCase",
    correctIdentifier: "sitDown",
    distractors: ["sitUp", "sitsFast", "sittingDown"],
  },
  {
    sentence: "sit down",
    style: "kebab-case",
    correctIdentifier: "sit-down",
    distractors: ["sit-up", "sits-fast", "sitting-down"],
  },
  {
    sentence: "walk forward",
    style: "camelCase",
    correctIdentifier: "walkForward",
    distractors: ["walkFast", "walkingForward", "walksForward"],
  },
  {
    sentence: "walk forward",
    style: "kebab-case",
    correctIdentifier: "walk-forward",
    distractors: ["walk-fast", "walking-forward", "walks-forward"],
  },
  {
    sentence: "look back",
    style: "camelCase",
    correctIdentifier: "lookBack",
    distractors: ["looksBack", "lookingForward", "lookBehind"],
  },
  {
    sentence: "look back",
    style: "kebab-case",
    correctIdentifier: "look-back",
    distractors: ["looks-back", "looking-forward", "look-behind"],
  },
  {
    sentence: "climb up",
    style: "camelCase",
    correctIdentifier: "climbUp",
    distractors: ["climbsUp", "climbingFast", "climbSlow"],
  },
  {
    sentence: "climb up",
    style: "kebab-case",
    correctIdentifier: "climb-up",
    distractors: ["climbs-up", "climbing-fast", "climb-slow"],
  },
  {
    sentence: "push forward",
    style: "camelCase",
    correctIdentifier: "pushForward",
    distractors: ["pushBack", "pushingFast", "pushesForward"],
  },
  {
    sentence: "push forward",
    style: "kebab-case",
    correctIdentifier: "push-forward",
    distractors: ["push-back", "pushing-fast", "pushes-forward"],
  },
  {
    sentence: "pull back",
    style: "camelCase",
    correctIdentifier: "pullBack",
    distractors: ["pullForward", "pullingFast", "pullsBack"],
  },
  {
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
      sentence: string;
      identifier: string;
      selected: string;
      isCorrect: boolean;
      responseTime: number;
    }[]
  >([]);
  const [startTime, setStartTime] = useState<number>(0);

  // Shuffle questions once for each user
  const [shuffledQuestions] = useState(() => {
    const shuffled = [...predefinedQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });

  useEffect(() => {
    setStartTime(Date.now());
  }, [currentIndex]);

  const handleAnswer = (selected: string) => {
    const question = shuffledQuestions[currentIndex];
    const { sentence, correctIdentifier } = question;

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

    if (currentIndex + 1 < shuffledQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onSubmit({ responses });
    }
  };

  const currentQuestion = shuffledQuestions[currentIndex];
  const options = [
    ...currentQuestion.distractors,
    currentQuestion.correctIdentifier,
  ];

  // Shuffle options for this question
  const shuffledOptions = [...options];
  for (let i = shuffledOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledOptions[i], shuffledOptions[j]] = [
      shuffledOptions[j],
      shuffledOptions[i],
    ];
  }

  return (
    <div className="space-y-4 text-center">
      <h2 className="text-xl font-bold">
        Question {currentIndex + 1} of {shuffledQuestions.length}
      </h2>
      <p className="text-lg">Identify the correct identifier:</p>
      <p className="font-mono text-lg">{currentQuestion.sentence}</p>
      <div className="grid grid-cols-2 gap-4">
        {shuffledOptions.map((option) => (
          <Button key={option} onClick={() => handleAnswer(option)}>
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SurveyQuestions;
