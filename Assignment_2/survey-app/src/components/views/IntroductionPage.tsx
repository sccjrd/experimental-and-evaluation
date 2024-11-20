import React from "react";
import { Button } from "@/components/ui/button";

interface IntroductionPageProps {
  onNext: () => void;
}

const IntroductionPage: React.FC<IntroductionPageProps> = ({ onNext }) => {
  return (
    <div className="space-y-4 text-center">
      <h1 className="text-2xl font-bold">Welcome to the Survey</h1>
      <p>
        Thank you for taking the time to participate in our survey. Your
        feedback is valuable and will help us improve our services.
      </p>
      <Button onClick={onNext}>Start Survey</Button>
    </div>
  );
};

export default IntroductionPage;
