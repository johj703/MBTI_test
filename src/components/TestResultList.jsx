import React, { useState, useEffect } from "react";
import {
  deleteTestResult,
  updateTestResultVisibility,
} from "../api/testResults";
import { mbtiDescriptions } from "../data/mbtiDescriptions";

const TestResultList = ({ results, user, onUpdate, onDelete }) => {
  // 로컬 상태로 결과 관리
  const [localResults, setLocalResults] = useState(results);

  // props가 변경될 때 로컬 상태 업데이트
  useEffect(() => {
    setLocalResults(results);
  }, [results]);

  // 현재 로그인한 사용자의 결과만 필터링
  const userResults = user
    ? localResults.filter((result) => result.nickname === user.nickname)
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
      // ============== 🚀 낙관적 업데이트 시작 ==============
      // API 호출하기 BEFORE에 UI를 먼저 변경
      // 사용자가 버튼을 클릭하자마자 즉시 화면이 업데이트됨
      setLocalResults((prevResults) =>
        prevResults.map((result) =>
          result.id === id
            ? { ...result, inVisible: !result.inVisible } // 상태를 반대로 변경
            : result
        )
      );
      // ============== 🚀 낙관적 업데이트 끝 ==============

      // 🌐 실제 API 호출 (서버에 변경사항 저장)
      await updateTestResultVisibility(id, !currentVisibility);

      // ✅ 성공 시에는 onUpdate 호출하지 않음 (이미 UI가 업데이트 되었기 때문에)
      // 이 줄을 제거하여 불필요한 재렌더링 방지
      // onUpdate();

      // 성공 확인용 로그
      console.log("가시성 업데이트 성공");
    } catch (error) {
      // ============== 🔄 롤백 시작 ==============
      // API 호출이 실패했을 때 원래 상태로 되돌리기
      setLocalResults((prevResults) =>
        prevResults.map((result) =>
          result.id === id
            ? { ...result, inVisible: !result.inVisible } // 다시 원래대로 복구
            : result
        )
      );
      // ============== 🔄 롤백 끝 ==============

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
        return "bg-yellow-100 border-yellow-300";
      case "I":
        return "bg-blue-100 border-blue-300";
      default:
        return "bg-gray-100 border-gray-300";
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
      {userResults.map((result) => {
        if (!result || !result.id) {
          return null;
        }

        // import한 mbitDescriptions 사용
        const description =
          mbtiDescriptions[result.result] ||
          "MBTI 유형 설명을 찾을 수 없습니다.";

        return (
          <div
            key={result.id}
            className={`border-2 rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl ${getMbtiColor(
              result.result
            )}`}
          >
            {/* 카드 헤더 */}
            <div className="px-6 py-4 bg-white border-b border-gray-200">
              <div className="flex flex-col space-y-3">
                {/* MBTI 유형 - 큰 글씨로 강조 */}
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-gray-800">
                    {result.result || "결과 없음"}
                  </h2>
                  {/* 공개/비공개 상태 배지 */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-500 ease-in-out ${
                      !result.inVisible
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {!result.inVisible ? "🌍 공개" : "🔒 비공개"}
                  </span>
                </div>

                {/* MBTI 설명 */}
                <div className="px-4 py-3 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-700 leading-relaxedd">
                    {description}
                  </p>
                </div>

                {/* 날짜 정보 */}
                <p className="flex items-center text-sm text-gray-500">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {formatDate(result.createdAt || result.date)}
                </p>
              </div>
            </div>

            {/* 카드 바디 */}
            <div className="px-6 py-4 space-y-4 bg-white">
              {/* 문항 완료 정보 - 중앙 정렬 */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  📝 총 {result.answers?.length || 0}개 문항 완료
                </p>
              </div>

              {/* 액션 버튼들 - 중앙 정렬 */}
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() =>
                    handleVisibilityToggle(result.id, !result.inVisible)
                  }
                  className="flex items-center px-4 py-2 space-x-1 text-sm text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  {!result.inVisible ? (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      </svg>
                      <span>숨기기</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.275 4.057-5.065 7-9.543 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span>공개하기</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDelete(result.id)}
                  className="flex items-center px-4 py-2 space-x-1 text-sm text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  <span>삭제</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TestResultList;
