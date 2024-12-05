import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface TryQuestionPageProps {
  onNext: () => void;
}

const tryQuestions = [
  {
    sentence: "max angle",
    style: "camelCase",
    correctIdentifier: "maxAngle",
    distractors: ["minAngle", "moreAngle", "mixAngle"],
  },
  {
    sentence: "max angle",
    style: "kebab-case",
    correctIdentifier: "max-angle",
    distractors: ["min-angle", "more-angle", "mix-angle"],
  },
];

const TryQuestionPage: React.FC<TryQuestionPageProps> = ({ onNext }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [showExample, setShowExample] = useState<boolean>(false);
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false); // Track button disabled state
  const currentQuestion = tryQuestions[currentQuestionIndex];

  useEffect(() => {
    shuffleOptions();
  }, [currentQuestionIndex]);

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
    if (selected === currentQuestion.correctIdentifier) {
      setFeedbackMessage("Nice job!");
      setButtonsDisabled(true);
      setTimeout(() => {
        setButtonsDisabled(false); // Re-enable buttons
        if (currentQuestionIndex < tryQuestions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setFeedbackMessage("");
        }
      }, 300);
    } else {
      setFeedbackMessage("Wrong identifier, Try again...");
      shuffleOptions();
    }
  };

  return (
    <div className="space-y-4 text-center">
      {!showExample ? (
        <div className="space-y-6 text-center">
          <h2 className="text-xl font-bold">What is an Identifier?</h2>
          <p className="text-lg">
            An <strong>Identifier</strong> is a name used to identify a
            variable, function, or other entity in programming. <br />
            It's usually formed by two or more words. We will show examples for
            the words:
          </p>
          <p className="text-lg">
            {" "}
            <span className="font-mono text-lg">max</span> and{" "}
            <span className="font-mono text-lg">angle</span>
          </p>
          <p className="text-lg">
            In <strong>camelCase</strong> words are combined without spaces,
            <br /> where each word after the first starts with a capital letter.{" "}
          </p>

          <p className="font-mono text-lg">maxAngle</p>

          <p className=" mt-4 text-lg">
            In <strong>kebab-case</strong>, words are combined with hyphens
            between them.
          </p>

          <p className="font-mono text-lg">max-angle</p>

          <p className="text-lg">
            We will just analyze these two types of identifiers, but there are
            many other types.
          </p>
          <Button onClick={() => setShowExample(true)}>Try Question</Button>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold">Try Question</h2>
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
          <div className="min-h-[80px] space-y-3">
            {feedbackMessage === "Nice job!" &&
              currentQuestionIndex === tryQuestions.length - 1 && (
                <>
                  <p className="text-lg">Now focus and do your best.</p>
                  <Button onClick={onNext}>Start Experiment!</Button>
                </>
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default TryQuestionPage;
