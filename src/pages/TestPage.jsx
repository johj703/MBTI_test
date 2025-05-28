import React from "react";
import TestForm from "../components/TestForm";
import { calculateMBTI } from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResults";
import { useNavigate } from "react-router-dom";

const Test = ({ user }) => {
  const navigate = useNavigate();

  const handleTestSubmit = async (answers) => {
    const result = calculateMBTI(answers);
    const resultData = {
      userId: user.id || user?.email,
      nickname: user?.nickname,
      mbtiType: mbtiResult,
      answers: answers,
      testDate: new Date().toISOString(),
    };
    await createTestResult(resultData);
    navigate("/results");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="mb-4 text-2xl font-bold">MBTI 테스트</h1>
      <TestForm onSubmit={handleTestSubmit} />
    </div>
  );
};

export default Test;
