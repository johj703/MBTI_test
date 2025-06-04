import React from "react";
import {
  deleteTestResult,
  updateTestResultVisibility,
} from "../api/testResults";

const TestResultItem = ({ result, user, onUpdate, onDelete }) => {
  const isOwner = result.userId === user.id;

  const formattedDate = new Date(result.date).toLocaleString();
  const description =
    mbtiDescriptions[result.result] || "MBTI 유형 설명을 찾을 수 없습니다.";

  const handleToggleVisibility = async () => {
    try {
      const newVisibility = !result.visibility;
      await updateTestResultVisibility(result.id, newVisibility);
      onUpdate(); // 부모 컴포넌트에서 결과 목록을 다시 불러오도록 요청
    } catch (error) {
      console.error("Visibility toggle failed:", error);
      alert("Visibility toggle failed. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTestResult(result.id);
      onDelete(); // 부모 컴포넌트에서 결과 목록을 다시 불러오도록 요청
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete failed. Please try again.");
    }
  };

  return (
    <div className="p-6 text-white bg-gray-800 rounded-lg shadow-lg">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-700">
        <h4 className="text-xl font-semibold">{result.nickname}</h4>
        <p className="text-sm text-gray-400">{formattedDate}</p>
      </div>
      <p className="mb-4 text-2xl font-bold text-yellow-400">{result.result}</p>
      <p className="mb-4 text-base text-gray-300">{description}</p>
      {isOwner && (
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleToggleVisibility}
            className="px-4 py-2 text-sm transition bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            {result.visibility ? "비공개로 전환" : "공개로 전환"}
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm transition bg-red-500 rounded-lg hover:bg-red-600"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default TestResultItem;
