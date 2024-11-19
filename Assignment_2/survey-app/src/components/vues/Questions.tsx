const Question = ({
  question,
  nextStep,
  handleChange,
  data,
}: {
  question: string;
  nextStep: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: { answer: string };
}) => {
  return (
    <div>
      <h1>{question}</h1>
      <input
        type="text"
        name="answer"
        value={data.answer}
        onChange={handleChange}
      />
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

export default Question;
