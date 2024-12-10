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
  // Two-word sentences
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

  // Three-word sentences
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
    style: "camelCase",
    correctIdentifier: "colorTheBackground",
    distractors: [
      "colorsTheBackground",
      "coloringTheBackground",
      "coloredTheBackground",
    ],
  },
  {
    index: 20,
    sentence: "select a file",
    style: "camelCase",
    correctIdentifier: "selectAFile",
    distractors: ["selectFiles", "selectingAFile", "selectedAFile"],
  },
  {
    index: 22,
    sentence: "move to left",
    style: "camelCase",
    correctIdentifier: "moveToLeft",
    distractors: ["movingToLeft", "movesToLeft", "movedToLeft"],
  },

  // Four-word sentences
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
  // Two-word sentences
  {
    index: 1,
    sentence: "shift up",
    style: "camelCase",
    correctIdentifier: "shiftUp",
    distractors: ["shiftRight", "shiftedUp", "shiftingUp"],
  },
  {
    index: 3,
    sentence: "zoom out",
    style: "camelCase",
    correctIdentifier: "zoomOut",
    distractors: ["zoomIn", "zoomedOut", "zoomingOut"],
  },
  {
    index: 5,
    sentence: "fade in",
    style: "camelCase",
    correctIdentifier: "fadeIn",
    distractors: ["fadesIn", "fadeAway", "fadingIn"],
  },
  {
    index: 7,
    sentence: "press pause",
    style: "camelCase",
    correctIdentifier: "pressPause",
    distractors: ["pressedPause", "pressPlay", "pressingPause"],
  },
  {
    index: 9,
    sentence: "align bottom",
    style: "camelCase",
    correctIdentifier: "alignBottom",
    distractors: ["alignTop", "alignedBottom", "alignToBottom"],
  },
  {
    index: 11,
    sentence: "enter slowly",
    style: "camelCase",
    correctIdentifier: "enterSlowly",
    distractors: ["entersSlowly", "enterFast", "enteringSlowly"],
  },

  // Three-word sentences
  {
    index: 13,
    sentence: "highlight entire paragraph",
    style: "camelCase",
    correctIdentifier: "highlightEntireParagraph",
    distractors: [
      "highlightedEntireParagraph",
      "highlightThisParagraph",
      "highlightingEntireParagraph",
    ],
  },
  {
    index: 15,
    sentence: "rotate large square",
    style: "camelCase",
    correctIdentifier: "rotateLargeSquare",
    distractors: [
      "rotatedLargeSquare",
      "rotatesLargeSquare",
      "rotatingLargeSquare",
    ],
  },
  {
    index: 17,
    sentence: "expand drop-down menu",
    style: "camelCase",
    correctIdentifier: "expandDropDownMenu",
    distractors: [
      "expandingDropDownMenu",
      "expandedDropDownMenu",
      "expandsDropDownMenu",
    ],
  },
  {
    index: 19,
    sentence: "color active field",
    style: "camelCase",
    correctIdentifier: "colorActiveField",
    distractors: [
      "coloringActiveField",
      "colorsActiveField",
      "coloredActiveField",
    ],
  },
  {
    index: 21,
    sentence: "select all items",
    style: "camelCase",
    correctIdentifier: "selectAllItems",
    distractors: ["selectingAllItems", "selectedAllItems", "selectItems"],
  },
  {
    index: 23,
    sentence: "move to right",
    style: "camelCase",
    correctIdentifier: "moveToRight",
    distractors: ["movedToRight", "movesToRight", "movingToRight"],
  },

  // Four-word sentences
  {
    index: 25,
    sentence: "navigate to settings panel",
    style: "kebab-case",
    correctIdentifier: "navigate-to-settings-panel",
    distractors: [
      "navigate-to-main-panel",
      "navigated-to-settings-panel",
      "navigating-to-settings-panel",
    ],
  },
  {
    index: 27,
    sentence: "adjust the screen brightness",
    style: "kebab-case",
    correctIdentifier: "adjust-the-screen-brightness",
    distractors: [
      "adjusting-the-screen-brightness",
      "adjust-screen-brightness-level",
      "adjust-the-brightness",
    ],
  },
  {
    index: 29,
    sentence: "sync all user data",
    style: "kebab-case",
    correctIdentifier: "sync-all-user-data",
    distractors: [
      "syncing-all-user-data",
      "sync-user-data-backup",
      "synchronizing-all-user-data",
    ],
  },
  {
    index: 31,
    sentence: "add a text layer",
    style: "kebab-case",
    correctIdentifier: "add-a-text-layer",
    distractors: [
      "adding-a-text-layer",
      "added-a-text-layer",
      "add-a-text-layers",
    ],
  },
  {
    index: 33,
    sentence: "link the previous version",
    style: "kebab-case",
    correctIdentifier: "link-the-previous-version",
    distractors: [
      "link-previous-versions",
      "linked-the-previous-version",
      "linking-the-previous-version",
    ],
  },
  {
    index: 35,
    sentence: "connect to secure server",
    style: "kebab-case",
    correctIdentifier: "connect-to-secure-server",
    distractors: [
      "connect-to-shared-server",
      "connecting-to-secure-server",
      "connected-to-secure-server",
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

      // Aggiungi la risposta al vettore delle risposte
      setResponses((prev) => [
        ...prev,
        {
          originalIndex,
          sentence,
          style,
          trials: trials + 1,
          responseTime,
        },
      ]);

      // Vai alla prossima domanda dopo un breve ritardo
      setTimeout(() => {
        setButtonsDisabled(false);
        if (currentIndex + 1 < questions.length) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          onSubmit({ responses });
        }
      }, 300);
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
