import React from "react";

const GeneralInfo = ({
  nextStep,
  handleChange,
  data,
}: {
  nextStep: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: { age: number; profession: string; codingExperience: boolean };
}) => {
  return (
    <div>
      <h1>General Information</h1>
      <label>
        Age:
        <input
          type="number"
          name="age"
          value={data.age}
          onChange={handleChange}
        />
      </label>
      <label>
        Profession:
        <input
          type="text"
          name="profession"
          value={data.profession}
          onChange={handleChange}
        />
      </label>
      <label>
        Experience with coding:
        <input
          type="checkbox"
          name="codingExperience"
          checked={data.codingExperience}
          onChange={handleChange}
        />
      </label>
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

export default GeneralInfo;
