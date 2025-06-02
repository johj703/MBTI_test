import React from "react";
import {
  deleteTestResult,
  updateTestResultVisibility,
} from "../api/testResults";

const TestResultList = ({ results, user, onUpdate, onDelete }) => {
  // 현재 로그인한 사용자의 결과만 필터링
  const userResults = user
    ? results.filter((result) => result.nickname === user.nickname)
    : [];

  // 테스트 결과 삭제 처리 함수
  const handleDelete = async (id) => {
    try {
      if (window.confirm("정말 이 테스트 결과를 삭제하시겠습니까?")) {
        await deleteTestResult(id);
        onDelete(); // 부모 컴포넌트에 삭제 알림
      }
    } catch (error) {
      console.error("결과 삭제 오류", error);
      alert("결과 삭제 중 오류가 발생했습니다.");
    }
  };
  // 테스트 결과 공개/비공개 상태 변경 함수
  const handleVisibilityToggle = async (id, currentVisibility) => {
    try {
      await updateTestResultVisibility(id, !currentVisibility);
      onUpdate(); // 부모 컴포넌트에 업데이트 알림
    } catch (error) {
      console.log("가시성 업데이트 오류: ", error);
      alert("상태 변경 중 오류가 발생했습니다.");
    }
  };

  // MBTI 유형에 따른 배경색을 결정하는 함수(방어적 코드 추가)
  const getMbtiColor = (mbtiType) => {
    // mbtiType이 없거나 유효하지 않은 경우 기본색 반환
    if (!mbtiType || typeof mbtiType !== "string" || mbtiType.length === 0) {
      return "bg-gray-100";
    }

    const firstLetter = mbtiType.charAt(0);
    switch (firstLetter) {
      case "E":
        return "bg-yellow-100";
      case "I":
        return "bg-blue-100";
      default:
        return "bg-gray-100";
    }
  };

  // 날짜 한국어 형식으로 변환하는 함수
  const formatDate = (dateString) => {
    if (!dateString) return "날짜 정보 없음";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "유효하지 않은 날짜";
    }
  };

  // 로그인하지 않은 사용자에게 표시할 UI
  if (!user) {
    return (
      <div className="py-8 text-center">
        <p className="text-lg text-gray-600">
          테스트 결과를 보려면 로그인이 필요합니다.
        </p>
        <button
          onClick={() => (window.location.href = "/login")}
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          로그인하기
        </button>
      </div>
    );
  }

  // 테스트 결과가 없는 경우 표시할 UI
  if (userResults.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-lg text-gray-600">아직 테스트 결과가 없습니다.</p>
        <button
          onClick={() => (window.location.href = "/test")}
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          테스트 시작하기
        </button>
      </div>
    );
  }

  // 테스트 결과 목록을 렌더링
  return (
    <div className="space-y-6">
      {userResults.map((result, index) => {
        if (!result || !result.id) {
          return null;
        }
        return (
          <div
            key={result.id}
            className={`border rounded-lg shadow-sm overflow-hidden ${getMbtiColor(
              result.result
            )}`}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold">
                  {result.result || "결과 없음"}
                </h3>
                <span className="text-sm text-gray-500">
                  {formatDate(result.createdAt || result.date)}
                </span>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      !result.inVisible
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {!result.inVisible ? "공개" : "비공개"}
                  </span>
                </div>

                <div className="space-x-2">
                  <button
                    onClick={() =>
                      handleVisibilityToggle(result.id, !result.inVisible)
                    }
                    className="px-3 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  >
                    {!result.inVisible ? "숨기기" : "공개하기"}
                  </button>
                  <button
                    onClick={() => handleDelete(result.id)}
                    className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TestResultList;
