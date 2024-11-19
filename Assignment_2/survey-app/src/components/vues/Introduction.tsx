const Introduction = ({ nextStep }: { nextStep: () => void }) => {
  return (
    <div>
      <h1>Welcome to the Survey</h1>
      <p>Please take a few minutes to complete this survey.</p>
      <button onClick={nextStep}>Start</button>
    </div>
  );
};

export default Introduction;
