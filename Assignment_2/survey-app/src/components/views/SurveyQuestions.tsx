import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface SurveyQuestionProps {
  onSubmit: (data: {
    responses: {
      originalIndex: number;
      sentence: string;
      style: string;
      trials: number;
      responseTime: number;
    }[];
  }) => void;
}

const predefinedQuestionsEven = [
  {
    index: 0,
    sentence: "shift left",
    style: "camelCase",
    correctIdentifier: "shiftLeft",
    distractors: ["shiftLift", "shiftRight", "shiftedLeft"],
  },
  {
    index: 2,
    sentence: "zoom in",
    style: "camelCase",
    correctIdentifier: "zoomIn",
    distractors: ["zoomOut", "zoomedIn", "zoomingIn"],
  },
  {
    index: 4,
    sentence: "fade out",
    style: "camelCase",
    correctIdentifier: "fadeOut",
    distractors: ["fadesOut", "fadeAway", "fadingOut"],
  },
  {
    index: 6,
    sentence: "press start",
    style: "camelCase",
    correctIdentifier: "pressStart",
    distractors: ["pressStop", "pressedStart", "pressingStart"],
  },
  {
    index: 8,
    sentence: "align top",
    style: "camelCase",
    correctIdentifier: "alignTop",
    distractors: ["alignBottom", "alignToTop", "alignedTop"],
  },
  {
    index: 10,
    sentence: "exit quickly",
    style: "camelCase",
    correctIdentifier: "exitQuickly",
    distractors: ["exitingQuickly", "exitsFast", "exitSlowly"],
  },
  {
    index: 12,
    sentence: "highlight this section",
    style: "camelCase",
    correctIdentifier: "highlightThisSection",
    distractors: [
      "highlightedThisSection",
      "highlightTheseSections",
      "highlightsThisSection",
    ],
  },
  {
    index: 14,
    sentence: "rotate the circle",
    style: "camelCase",
    correctIdentifier: "rotateTheCircle",
    distractors: ["rotatingTheCircle", "rotatedTheCircle", "rotatesTheCircle"],
  },
  {
    index: 16,
    sentence: "expand main menu",
    style: "camelCase",
    correctIdentifier: "expandMainMenu",
    distractors: ["expandsMainMenu", "expandingMainMenu", "expandedMainMenu"],
  },
  {
    index: 18,
    sentence: "color the background",
    style: "kebab-case",
    correctIdentifier: "color-the-background",
    distractors: [
      "colors-the-background",
      "coloring-the-background",
      "colored-the-background",
    ],
  },
  {
    index: 20,
    sentence: "select a file",
    style: "kebab-case",
    correctIdentifier: "select-a-file",
    distractors: ["select-file", "selecting-a-file", "selected-a-file"],
  },
  {
    index: 22,
    sentence: "move to left",
    style: "kebab-case",
    correctIdentifier: "move-to-left",
    distractors: ["moving-to-left", "moves-to-left", "moved-to-left"],
  },
  {
    index: 24,
    sentence: "navigate to home page",
    style: "kebab-case",
    correctIdentifier: "navigate-to-home-page",
    distractors: [
      "navigate-to-main-page",
      "navigation-to-home-page",
      "navigating-to-home-page",
    ],
  },
  {
    index: 26,
    sentence: "adjust to screen size",
    style: "kebab-case",
    correctIdentifier: "adjust-to-screen-size",
    distractors: [
      "adjust-screen-dimensions-size",
      "adjusting-to-screen-size",
      "adjust-to-scene-size",
    ],
  },
  {
    index: 28,
    sentence: "sync with backup data",
    style: "kebab-case",
    correctIdentifier: "sync-with-backup-data",
    distractors: [
      "sync-to-backup-data",
      "syncing-with-backup-data",
      "synchronizing-with-backup-data",
    ],
  },
  {
    index: 30,
    sentence: "add a new layer",
    style: "kebab-case",
    correctIdentifier: "add-a-new-layer",
    distractors: [
      "added-a-new-layer",
      "adding-a-new-layer",
      "add-a-new-layers",
    ],
  },
  {
    index: 32,
    sentence: "link the external source",
    style: "kebab-case",
    correctIdentifier: "link-the-external-source",
    distractors: [
      "link-the-external-resources",
      "linked-the-external-source",
      "linking-the-external-source",
    ],
  },
  {
    index: 34,
    sentence: "connect to local network",
    style: "kebab-case",
    correctIdentifier: "connect-to-local-network",
    distractors: [
      "connect-to-global-network",
      "connecting-to-local-network",
      "connected-to-local-network",
    ],
  },
];

const predefinedQuestionsOdd = [
  {
    index: 1,
    sentence: "shift left",
    style: "kebab-case",
    correctIdentifier: "shift-left",
    distractors: ["shift-lift", "shift-right", "shifted-left"],
  },
  {
    index: 3,
    sentence: "zoom in",
    style: "kebab-case",
    correctIdentifier: "zoom-in",
    distractors: ["zoom-out", "zoomed-in", "zooming-in"],
  },
  {
    index: 5,
    sentence: "fade out",
    style: "kebab-case",
    correctIdentifier: "fade-out",
    distractors: ["fades-out", "fade-away", "fading-out"],
  },
  {
    index: 7,
    sentence: "press start",
    style: "kebab-case",
    correctIdentifier: "press-start",
    distractors: ["press-stop", "pressed-start", "pressing-start"],
  },
  {
    index: 9,
    sentence: "align top",
    style: "kebab-case",
    correctIdentifier: "align-top",
    distractors: ["align-bottom", "align-to-top", "aligned-top"],
  },
  {
    index: 11,
    sentence: "exit quickly",
    style: "kebab-case",
    correctIdentifier: "exit-quickly",
    distractors: ["exiting-quickly", "exits-fast", "exit-slowly"],
  },
  {
    index: 13,
    sentence: "highlight this section",
    style: "kebab-case",
    correctIdentifier: "highlight-this-section",
    distractors: [
      "highlighted-this-section",
      "highlight-these-sections",
      "highlights-this-section",
    ],
  },
  {
    index: 15,
    sentence: "rotate the circle",
    style: "kebab-case",
    correctIdentifier: "rotate-the-circle",
    distractors: [
      "rotating-the-circle",
      "rotated-the-circle",
      "rotates-the-circle",
    ],
  },
  {
    index: 17,
    sentence: "expand main menu",
    style: "kebab-case",
    correctIdentifier: "expand-main-menu",
    distractors: [
      "expands-main-menu",
      "expanding-main-menu",
      "expanded-main-menu",
    ],
  },
  {
    index: 19,
    sentence: "color the background",
    style: "camelCase",
    correctIdentifier: "colorTheBackground",
    distractors: [
      "colorsTheBackground",
      "coloringTheBackground",
      "coloredTheBackground",
    ],
  },
  {
    index: 21,
    sentence: "select a file",
    style: "camelCase",
    correctIdentifier: "selectAFile",
    distractors: ["selectFile", "selectingAFile", "selectedAFile"],
  },
  {
    index: 23,
    sentence: "move to left",
    style: "camelCase",
    correctIdentifier: "moveToLeft",
    distractors: ["movingToLeft", "movesToLeft", "movedToLeft"],
  },
  {
    index: 25,
    sentence: "navigate to home page",
    style: "camelCase",
    correctIdentifier: "navigateToHomePage",
    distractors: [
      "navigateToMainPage",
      "navigationToHomePage",
      "navigatingToHomePage",
    ],
  },
  {
    index: 27,
    sentence: "adjust to screen size",
    style: "camelCase",
    correctIdentifier: "adjustToScreenSize",
    distractors: [
      "adjustScreenDimensionsSize",
      "adjustingToScreenSize",
      "adjustToSceneSize",
    ],
  },
  {
    index: 29,
    sentence: "sync with backup data",
    style: "camelCase",
    correctIdentifier: "syncWithBackupData",
    distractors: [
      "syncToBackupData",
      "syncingWithBackupData",
      "synchronizingWithBackupData",
    ],
  },
  {
    index: 31,
    sentence: "add a new layer",
    style: "camelCase",
    correctIdentifier: "addANewLayer",
    distractors: ["addedANewLayer", "addingANewLayer", "addANewLayers"],
  },
  {
    index: 33,
    sentence: "link the external source",
    style: "camelCase",
    correctIdentifier: "linkTheExternalSource",
    distractors: [
      "linkTheExternalResources",
      "linkedTheExternalSource",
      "linkingTheExternalSource",
    ],
  },
  {
    index: 35,
    sentence: "connect to local network",
    style: "camelCase",
    correctIdentifier: "connectToLocalNetwork",
    distractors: [
      "connectToGlobalNetwork",
      "connectingToLocalNetwork",
      "connectedToLocalNetwork",
    ],
  },
];

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

const SurveyQuestions: React.FC<SurveyQuestionProps> = ({ onSubmit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<
    {
      originalIndex: number;
      sentence: string;
      style: string;
      trials: number;
      responseTime: number;
    }[]
  >([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [trials, setTrials] = useState<number>(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionsReady, setQuestionsReady] = useState<boolean>(false); // Track if questions are ready

  // Effettua il fetch per ottenere il conteggio delle risposte e caricare le domande
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const N = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/responses-count`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        ).then((res) => res.json());
        const questions =
          N.count % 2 === 0 ? predefinedQuestionsEven : predefinedQuestionsOdd;
        const shuffledQuestions = shuffleArray([...questions]);
        setQuestions(shuffledQuestions); // Imposta le domande
        setQuestionsReady(true);
      } catch (error) {
        console.error("Error fetching response count or questions", error);
      }
    };

    fetchQuestions();
  }, []); // Esegui solo una volta quando il componente è montato

  // Logica per gestire la domanda corrente
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (currentQuestion) {
      setStartTime(Date.now());
      setTrials(0);
      setFeedbackMessage("");
      shuffleOptions();
    }
  }, [currentIndex, currentQuestion]);

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
      style,
      correctIdentifier,
    } = currentQuestion;

    if (selected === correctIdentifier) {
      const responseTime = Date.now() - startTime;
      setFeedbackMessage("Correct!");
      setButtonsDisabled(true);

      // Save the response
      const newResponses = [
        ...responses,
        {
          originalIndex,
          sentence,
          style,
          trials: trials + 1,
          responseTime,
        },
      ];
      setResponses(newResponses);

      if (currentIndex + 1 < questions.length) {
        // Proceed to the next question after 300ms
        setTimeout(() => {
          setButtonsDisabled(false);
          setCurrentIndex((prev) => prev + 1);
        }, 300);
      } else {
        // Submit the responses if it's the last question
        onSubmit({ responses: newResponses });
      }
    } else {
      setTrials((prev) => prev + 1);
      setFeedbackMessage("Wrong identifier, Try again...");
      shuffleOptions();
    }
  };

  if (!questionsReady) {
    return (
      <div className="space-y-4 text-center">
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-6 w-64 mx-auto" />
        <Skeleton className="h-6 w-32 mx-auto" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-center">
      <h2 className="text-xl font-bold">
        Question {currentIndex + 1} of {questions.length}
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
