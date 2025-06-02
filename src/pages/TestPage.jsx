import React from "react";
import TestForm from "../components/TestForm";
import { calculateMBTI } from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResults";
import { useNavigate } from "react-router-dom";

const Test = ({ user }) => {
  const navigate = useNavigate();

  const handleTestSubmit = async (answers) => {
    try {
      // questions를 함께 전달
      const result = calculateMBTI(answers);

      const resultData = {
        userId: user?.id || user?.email,
        nickname: user?.nickname,
        result: result,
        answers: answers,
        date: new Date().toISOString(),
      };

      await createTestResult(resultData);
      navigate("/results");
    } catch (error) {
      console.error("테스트 제출 오류", error);
      alert("테스트 결과 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="mb-4 text-2xl font-bold">MBTI 테스트</h1>
      <TestForm onSubmit={handleTestSubmit} />
    </div>
  );
};

export default Test;
