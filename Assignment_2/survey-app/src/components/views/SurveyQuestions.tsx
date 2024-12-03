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
    sentence: "jump high",
    style: "camelCase",
    correctIdentifier: "jumpHigh",
    distractors: ["jumpSource", "jumpsSound", "jumpMore"],
  },
  {
    index: 2,
    sentence: "run fast",
    style: "camelCase",
    correctIdentifier: "runFast",
    distractors: ["runFastly", "runsSource", "runSlow"],
  },
  {
    index: 3,
    sentence: "turn left",
    style: "camelCase",
    correctIdentifier: "turnLeft",
    distractors: ["turnRight", "turnSlow", "turnLift"],
  },
  {
    index: 4,
    sentence: "stand tall",
    style: "camelCase",
    correctIdentifier: "standTall",
    distractors: ["standSlow", "standFall", "standsHigh"],
  },
  {
    index: 5,
    sentence: "sit down",
    style: "camelCase",
    correctIdentifier: "sitDown",
    distractors: ["sitUp", "sitsFast", "sittingDown"],
  },
  {
    index: 6,
    sentence: "walk forward",
    style: "camelCase",
    correctIdentifier: "walkForward",
    distractors: ["walkFast", "walkingForward", "walksForward"],
  },
  {
    index: 7,
    sentence: "look back",
    style: "camelCase",
    correctIdentifier: "lookBack",
    distractors: ["looksBack", "lookingForward", "lookBehind"],
  },
  {
    index: 8,
    sentence: "climb up",
    style: "camelCase",
    correctIdentifier: "climbUp",
    distractors: ["climbsUp", "climbingFast", "climbSlow"],
  },
  {
    index: 9,
    sentence: "push forward",
    style: "camelCase",
    correctIdentifier: "pushForward",
    distractors: ["pushBack", "pushingFast", "pushesForward"],
  },
  // {
  //   index: 10,
  //   sentence: "pull back",
  //   style: "camelCase",
  //   correctIdentifier: "pullBack",
  //   distractors: ["pullForward", "pullingBack", "pullsBack"],
  // },
  // {
  //   index: 11,
  //   sentence: "slide down",
  //   style: "camelCase",
  //   correctIdentifier: "slideDown",
  //   distractors: ["slideUp", "slidingDown", "slidesDown"],
  // },
  // {
  //   index: 12,
  //   sentence: "crawl forward",
  //   style: "camelCase",
  //   correctIdentifier: "crawlForward",
  //   distractors: ["crawlBack", "crawlingForward", "crawlsForward"],
  // },
  // {
  //   index: 13,
  //   sentence: "jump over",
  //   style: "camelCase",
  //   correctIdentifier: "jumpOver",
  //   distractors: ["jumpUnder", "jumpingOver", "jumpsOver"],
  // },
  // {
  //   index: 14,
  //   sentence: "run around",
  //   style: "camelCase",
  //   correctIdentifier: "runAround",
  //   distractors: ["runStraight", "runningAround", "runsAround"],
  // },
  // {
  //   index: 15,
  //   sentence: "spin fast",
  //   style: "camelCase",
  //   correctIdentifier: "spinFast",
  //   distractors: ["spinSlow", "spinningFast", "spinsFast"],
  // },
  // {
  //   index: 16,
  //   sentence: "dive deep",
  //   style: "camelCase",
  //   correctIdentifier: "diveDeep",
  //   distractors: ["diveShallow", "divingDeep", "divesDeep"],
  // },
  // {
  //   index: 17,
  //   sentence: "fly high",
  //   style: "camelCase",
  //   correctIdentifier: "flyHigh",
  //   distractors: ["flyLow", "flyingHigh", "fliesHigh"],
  // },
  // {
  //   index: 18,
  //   sentence: "swim fast",
  //   style: "camelCase",
  //   correctIdentifier: "swimFast",
  //   distractors: ["swimSlow", "swimmingFast", "swimsFast"],
  // },
  // {
  //   index: 19,
  //   sentence: "climb down",
  //   style: "camelCase",
  //   correctIdentifier: "climbDown",
  //   distractors: ["climbUp", "climbingDown", "climbsDown"],
  // },
  // {
  //   index: 20,
  //   sentence: "move south",
  //   style: "kebab-case",
  //   correctIdentifier: "move-south",
  //   distractors: ["move-source", "mover-sound", "more-south"],
  // },
  // {
  //   index: 21,
  //   sentence: "jump high",
  //   style: "kebab-case",
  //   correctIdentifier: "jump-high",
  //   distractors: ["jump-source", "jumps-sound", "jump-more"],
  // },
  // {
  //   index: 22,
  //   sentence: "run fast",
  //   style: "kebab-case",
  //   correctIdentifier: "run-fast",
  //   distractors: ["run-fastly", "runs-source", "run-slow"],
  // },
  // {
  //   index: 23,
  //   sentence: "turn left",
  //   style: "kebab-case",
  //   correctIdentifier: "turn-left",
  //   distractors: ["turn-right", "turn-slow", "turn-lift"],
  // },
  // {
  //   index: 24,
  //   sentence: "stand tall",
  //   style: "kebab-case",
  //   correctIdentifier: "stand-tall",
  //   distractors: ["stand-slow", "stand-fall", "stands-high"],
  // },
  // {
  //   index: 25,
  //   sentence: "sit down",
  //   style: "kebab-case",
  //   correctIdentifier: "sit-down",
  //   distractors: ["sit-up", "sits-fast", "sitting-down"],
  // },
  // {
  //   index: 26,
  //   sentence: "walk forward",
  //   style: "kebab-case",
  //   correctIdentifier: "walk-forward",
  //   distractors: ["walk-fast", "walking-forward", "walks-forward"],
  // },
  // {
  //   index: 27,
  //   sentence: "look back",
  //   style: "kebab-case",
  //   correctIdentifier: "look-back",
  //   distractors: ["looks-back", "looking-forward", "look-behind"],
  // },
  // {
  //   index: 28,
  //   sentence: "climb up",
  //   style: "kebab-case",
  //   correctIdentifier: "climb-up",
  //   distractors: ["climbs-up", "climbing-fast", "climb-slow"],
  // },
  // {
  //   index: 29,
  //   sentence: "push forward",
  //   style: "kebab-case",
  //   correctIdentifier: "push-forward",
  //   distractors: ["push-back", "pushing-fast", "pushes-forward"],
  // },
  {
    index: 30,
    sentence: "pull back",
    style: "kebab-case",
    correctIdentifier: "pull-back",
    distractors: ["pull-forward", "pulling-back", "pulls-back"],
  },
  {
    index: 31,
    sentence: "slide down",
    style: "kebab-case",
    correctIdentifier: "slide-down",
    distractors: ["slide-up", "sliding-down", "slides-down"],
  },
  {
    index: 32,
    sentence: "crawl forward",
    style: "kebab-case",
    correctIdentifier: "crawl-forward",
    distractors: ["crawl-back", "crawling-forward", "crawls-forward"],
  },
  {
    index: 33,
    sentence: "jump over",
    style: "kebab-case",
    correctIdentifier: "jump-over",
    distractors: ["jump-under", "jumping-over", "jumps-over"],
  },
  {
    index: 34,
    sentence: "run around",
    style: "kebab-case",
    correctIdentifier: "run-around",
    distractors: ["run-straight", "running-around", "runs-around"],
  },
  {
    index: 35,
    sentence: "spin fast",
    style: "kebab-case",
    correctIdentifier: "spin-fast",
    distractors: ["spin-slow", "spinning-fast", "spins-fast"],
  },
  {
    index: 36,
    sentence: "dive deep",
    style: "kebab-case",
    correctIdentifier: "dive-deep",
    distractors: ["dive-shallow", "diving-deep", "dives-deep"],
  },
  {
    index: 37,
    sentence: "fly high",
    style: "kebab-case",
    correctIdentifier: "fly-high",
    distractors: ["fly-low", "flying-high", "flies-high"],
  },
  {
    index: 38,
    sentence: "swim fast",
    style: "kebab-case",
    correctIdentifier: "swim-fast",
    distractors: ["swim-slow", "swimming-fast", "swims-fast"],
  },
  {
    index: 39,
    sentence: "climb down",
    style: "kebab-case",
    correctIdentifier: "climb-down",
    distractors: ["climb-up", "climbing-down", "climbs-down"],
  },
];

// const predefinedQuestionsEven = [
//   {
//     index: 0,
//     sentence: "move south",
//     style: "camelCase",
//     correctIdentifier: "moveSouth",
//     distractors: ["moveSource", "moverSound", "moreSouth"],
//   },
//   {
//     index: 2,
//     sentence: "jump high",
//     style: "camelCase",
//     correctIdentifier: "jumpHigh",
//     distractors: ["jumpSource", "jumpsSound", "jumpMore"],
//   },
//   {
//     index: 4,
//     sentence: "run fast",
//     style: "camelCase",
//     correctIdentifier: "runFast",
//     distractors: ["runFastly", "runsSource", "runSlow"],
//   },
//   {
//     index: 6,
//     sentence: "turn left",
//     style: "camelCase",
//     correctIdentifier: "turnLeft",
//     distractors: ["turnRight", "turnSlow", "turnLift"],
//   },
//   {
//     index: 8,
//     sentence: "stand tall",
//     style: "camelCase",
//     correctIdentifier: "standTall",
//     distractors: ["standSlow", "standFall", "standsHigh"],
//   },
//   {
//     index: 10,
//     sentence: "sit down",
//     style: "camelCase",
//     correctIdentifier: "sitDown",
//     distractors: ["sitUp", "sitsFast", "sittingDown"],
//   },
//   {
//     index: 12,
//     sentence: "walk forward",
//     style: "camelCase",
//     correctIdentifier: "walkForward",
//     distractors: ["walkFast", "walkingForward", "walksForward"],
//   },
//   {
//     index: 14,
//     sentence: "look back",
//     style: "camelCase",
//     correctIdentifier: "lookBack",
//     distractors: ["looksBack", "lookingForward", "lookBehind"],
//   },
//   {
//     index: 16,
//     sentence: "climb up",
//     style: "camelCase",
//     correctIdentifier: "climbUp",
//     distractors: ["climbsUp", "climbingFast", "climbSlow"],
//   },
//   {
//     index: 18,
//     sentence: "push forward",
//     style: "camelCase",
//     correctIdentifier: "pushForward",
//     distractors: ["pushBack", "pushingFast", "pushesForward"],
//   },
//   {
//     index: 20,
//     sentence: "pull back",
//     style: "kebab-case",
//     correctIdentifier: "pull-back",
//     distractors: ["pull-forward", "pulling-back", "pulls-back"],
//   },
//   {
//     index: 22,
//     sentence: "slide down",
//     style: "kebab-case",
//     correctIdentifier: "slide-down",
//     distractors: ["slide-up", "sliding-down", "slides-down"],
//   },
//   {
//     index: 24,
//     sentence: "crawl forward",
//     style: "kebab-case",
//     correctIdentifier: "crawl-forward",
//     distractors: ["crawl-back", "crawling-forward", "crawls-forward"],
//   },
//   {
//     index: 26,
//     sentence: "jump over",
//     style: "kebab-case",
//     correctIdentifier: "jump-over",
//     distractors: ["jump-under", "jumping-over", "jumps-over"],
//   },
//   {
//     index: 28,
//     sentence: "run around",
//     style: "kebab-case",
//     correctIdentifier: "run-around",
//     distractors: ["run-straight", "running-around", "runs-around"],
//   },
//   {
//     index: 30,
//     sentence: "spin fast",
//     style: "kebab-case",
//     correctIdentifier: "spin-fast",
//     distractors: ["spin-slow", "spinning-fast", "spins-fast"],
//   },
//   {
//     index: 32,
//     sentence: "dive deep",
//     style: "kebab-case",
//     correctIdentifier: "dive-deep",
//     distractors: ["dive-shallow", "diving-deep", "dives-deep"],
//   },
//   {
//     index: 34,
//     sentence: "fly high",
//     style: "kebab-case",
//     correctIdentifier: "fly-high",
//     distractors: ["fly-low", "flying-high", "flies-high"],
//   },
//   {
//     index: 36,
//     sentence: "swim fast",
//     style: "kebab-case",
//     correctIdentifier: "swim-fast",
//     distractors: ["swim-slow", "swimming-fast", "swims-fast"],
//   },
//   {
//     index: 38,
//     sentence: "climb down",
//     style: "kebab-case",
//     correctIdentifier: "climb-down",
//     distractors: ["climb-up", "climbing-down", "climbs-down"],
//   },
// ];

// const predefinedQuestionsOdd = [
//   {
//     index: 1,
//     sentence: "pull back",
//     style: "camelCase",
//     correctIdentifier: "pullBack",
//     distractors: ["pullForward", "pullingBack", "pullsBack"],
//   },
//   {
//     index: 3,
//     sentence: "slide down",
//     style: "camelCase",
//     correctIdentifier: "slideDown",
//     distractors: ["slideUp", "slidingDown", "slidesDown"],
//   },
//   {
//     index: 5,
//     sentence: "crawl forward",
//     style: "camelCase",
//     correctIdentifier: "crawlForward",
//     distractors: ["crawlBack", "crawlingForward", "crawlsForward"],
//   },
//   {
//     index: 7,
//     sentence: "jump over",
//     style: "camelCase",
//     correctIdentifier: "jumpOver",
//     distractors: ["jumpUnder", "jumpingOver", "jumpsOver"],
//   },
//   {
//     index: 9,
//     sentence: "run around",
//     style: "camelCase",
//     correctIdentifier: "runAround",
//     distractors: ["runStraight", "runningAround", "runsAround"],
//   },
//   {
//     index: 11,
//     sentence: "spin fast",
//     style: "camelCase",
//     correctIdentifier: "spinFast",
//     distractors: ["spinSlow", "spinningFast", "spinsFast"],
//   },
//   {
//     index: 13,
//     sentence: "dive deep",
//     style: "camelCase",
//     correctIdentifier: "diveDeep",
//     distractors: ["diveShallow", "divingDeep", "divesDeep"],
//   },
//   {
//     index: 15,
//     sentence: "fly high",
//     style: "camelCase",
//     correctIdentifier: "flyHigh",
//     distractors: ["flyLow", "flyingHigh", "fliesHigh"],
//   },
//   {
//     index: 17,
//     sentence: "swim fast",
//     style: "camelCase",
//     correctIdentifier: "swimFast",
//     distractors: ["swimSlow", "swimmingFast", "swimsFast"],
//   },
//   {
//     index: 19,
//     sentence: "climb down",
//     style: "camelCase",
//     correctIdentifier: "climbDown",
//     distractors: ["climbUp", "climbingDown", "climbsDown"],
//   },
//   {
//     index: 21,
//     sentence: "move south",
//     style: "kebab-case",
//     correctIdentifier: "move-south",
//     distractors: ["move-source", "mover-sound", "more-south"],
//   },
//   {
//     index: 23,
//     sentence: "jump high",
//     style: "kebab-case",
//     correctIdentifier: "jump-high",
//     distractors: ["jump-source", "jumps-sound", "jump-more"],
//   },
//   {
//     index: 25,
//     sentence: "run fast",
//     style: "kebab-case",
//     correctIdentifier: "run-fast",
//     distractors: ["run-fastly", "runs-source", "run-slow"],
//   },
//   {
//     index: 27,
//     sentence: "turn left",
//     style: "kebab-case",
//     correctIdentifier: "turn-left",
//     distractors: ["turn-right", "turn-slow", "turn-lift"],
//   },
//   {
//     index: 29,
//     sentence: "stand tall",
//     style: "kebab-case",
//     correctIdentifier: "stand-tall",
//     distractors: ["stand-slow", "stand-fall", "stands-high"],
//   },
//   {
//     index: 31,
//     sentence: "sit down",
//     style: "kebab-case",
//     correctIdentifier: "sit-down",
//     distractors: ["sit-up", "sits-fast", "sitting-down"],
//   },
//   {
//     index: 33,
//     sentence: "walk forward",
//     style: "kebab-case",
//     correctIdentifier: "walk-forward",
//     distractors: ["walk-fast", "walking-forward", "walks-forward"],
//   },
//   {
//     index: 35,
//     sentence: "look back",
//     style: "kebab-case",
//     correctIdentifier: "look-back",
//     distractors: ["looks-back", "looking-forward", "look-behind"],
//   },
//   {
//     index: 37,
//     sentence: "climb up",
//     style: "kebab-case",
//     correctIdentifier: "climb-up",
//     distractors: ["climbs-up", "climbing-fast", "climb-slow"],
//   },
//   {
//     index: 39,
//     sentence: "push forward",
//     style: "kebab-case",
//     correctIdentifier: "push-forward",
//     distractors: ["push-back", "pushing-fast", "pushes-forward"],
//   },
// ];

interface Question {
  index: number;
  sentence: string;
  style: string;
  correctIdentifier: string;
  distractors: string[];
}

const shuffleArray = (array: Question[]): Question[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const shuffledQuestions = shuffleArray([...predefinedQuestions]);

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
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]); // Track shuffled options
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false); // Track button disabled state

  const currentQuestion = shuffledQuestions[currentIndex];

  useEffect(() => {
    // Reset state and shuffle options when a new question loads
    setStartTime(Date.now());
    setTrials(0);
    setFeedbackMessage("");
    shuffleOptions();
  }, [currentIndex]);

  const shuffleOptions = () => {
    const options = [
      ...currentQuestion.distractors,
      currentQuestion.correctIdentifier,
    ];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    setShuffledOptions(options);
  };

  const handleAnswer = (selected: string) => {
    const {
      index: originalIndex,
      sentence,
      correctIdentifier,
    } = currentQuestion;

    if (selected === correctIdentifier) {
      // Correct answer
      const responseTime = Date.now() - startTime;
      setFeedbackMessage("Correct!");
      setButtonsDisabled(true);

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

      // Proceed to the next question after 300ms
      setTimeout(() => {
        setButtonsDisabled(false);
        if (currentIndex + 1 < shuffledQuestions.length) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          onSubmit({ responses });
        }
      }, 300);
    } else {
      // Incorrect answer
      setTrials((prev) => prev + 1); // Increment trial count
      setFeedbackMessage("Wrong identifier, Try again...");
      shuffleOptions(); // Reshuffle the options
    }
  };

  return (
    <div className="space-y-4 text-center">
      <h2 className="text-xl font-bold">
        Question {currentIndex + 1} of {shuffledQuestions.length}
      </h2>
      <p className="text-lg">Identify the correct identifier:</p>
      <p className="font-mono text-lg">{currentQuestion.sentence}</p>
      <div className="grid grid-cols-2 gap-4">
        {shuffledOptions.map((option) => (
          <Button
            key={option}
            onClick={() => handleAnswer(option)}
            disabled={buttonsDisabled}
          >
            {option}
          </Button>
        ))}
      </div>
      <div className="mt-4 min-h-[30px]">
        {feedbackMessage ? (
          <p className="text-lg">{feedbackMessage}</p>
        ) : (
          <p className="invisible">&nbsp;</p>
        )}
      </div>
    </div>
  );
};

export default SurveyQuestions;
