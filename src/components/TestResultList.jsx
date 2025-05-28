import React from "react";
import { deleteTestResult } from "../api/testResults";

const TestResultList = ({ results, user, onUpdate, onDelete }) => {
  // 현재 로그인한 사용자의 결과만 필터링
  const userResults = user
    ? results.filter((result) => result.userId === user.id)
    : [];
  // 테스트 결과 삭제 처리 함수
  const handleDelete = async (id) => {
    try {
      if (window.fonfirm("정말 이 테스트 결과를 삭제하시겠습니까?")) {
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

  // MBTI 유형에 따른 배경색 설정
  const getMbtiColor = (mbtiType) => {
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

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  // 로그인하지 않은 사용자에게 표시할 UI
  if (!user) {
    return (
      <div>
        <p>테스트 결과를 보려면 로그인이 필요합니다.</p>
        <button onClick={() => (window.location.href = "/login")}>
          로그인하기
        </button>
      </div>
    );
  }
  // 테스트 결과가 없는 경우 표시할 UI
  if (userResults.length === 0) {
    return (
      <div>
        <p>아직 테스트 결과가 없습니다.</p>
        <button onClick={() => (window.location.href = "/test")}>
          테스트 시작하기
        </button>
      </div>
    );
  }
  // 테스트 결과 목록을 렌더링
  return (
    <div>
      {userResults.map((result) => {
        <div key={result.id}>
          <div>
            <div>
              <h3>{result.mbtiType}</h3>
              <span>{formatDate(result.createAt || result.testDate)}</span>
            </div>
            <div>
              <div>
                <span>{result.inVisible ? "공개" : "비공개"}</span>
              </div>
            </div>
            <div>
              <button
                onClick={() =>
                  handleVisibilityToggle(result.id, result.isVisible)
                }
              >
                {result.inVisible ? "숨기기" : "공개하기"}
              </button>
              <button onClick={() => handleDelete(result.id)}>삭제</button>
            </div>
          </div>
        </div>;
      })}
    </div>
  );
};

export default TestResultList;
