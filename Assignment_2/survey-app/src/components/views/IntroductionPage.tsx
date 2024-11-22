import React from "react";
import { Button } from "@/components/ui/button";

interface IntroductionPageProps {
  onNext: () => void;
}

const IntroductionPage: React.FC<IntroductionPageProps> = ({ onNext }) => {
  return (
    <div className="space-y-6 text-center">
      <h1 className="text-3xl font-bold">Welcome to the Experiment</h1>
      <p className="text-lg">
        This study explores whether code identifiers are easier to read in{" "}
        <strong>camelCase</strong> or <strong>kebab-case</strong>.
      </p>
      <p className="text-lg">
        You will be shown programming identifiers in both formats. Your task is
        to identify them as quickly and accurately as possible.
      </p>
      <p className="text-lg">Focus and do your best. Click below to begin!</p>
      <Button onClick={onNext}>Start Experiment!</Button>
    </div>
  );
};

export default IntroductionPage;
