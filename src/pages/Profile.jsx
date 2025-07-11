import { useState } from "react";

const Profile = ({ user, setUser }) => {
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" 또는 "error"

  // 닉네임 변경 핸들러(사용자가 타이핑할 때마다 이전 메시지 제거)
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    // 이전에 표시된 에러나 성공 메세지를 즉시 제거
    // 사용자가 문제를 사정하려고 시도하고 있다는 것을 감지
    if (message) {
      setMessage("");
      setMessageType("");
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!nickname.trim()) {
      setMessage("닉네임을 입력해 주세요.");
      setMessageType("error");
      return;
    }

    if (nickname.trim().length < 2) {
      setMessage("닉네임은 최소 2글자 이상이어야 합니다.");
      setMessageType("error");
      return;
    }

    if (nickname.trim() === user?.nickname) {
      setMessage("현재 닉네임과 동일합니다.");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // updatedUser 변수를 먼저 선언
      const updatedUser = { ...user, nickname: nickname.trim() };

      // localStorage에서 현재 사용자 정보 업데이트
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // localStorage의 users 배열도 업데이트(회원가입 시 저장된 사용자 목록)
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((u) =>
        u.email === user.email ? { ...u, nickname: nickname.trim() } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // 전역 사용자 상테 업데이트(Header 등에서 즉시 반영됨)
      setUser(updatedUser);

      setMessage("프로필이 성공적으로 업데이트 되었습니다!");
      setMessageType("Success");
    } catch (error) {
      console.error("프로필 업데이트 오류: ", error);
      setMessage("프로필 업데이트 중 오류가 발생했습니다. 다시 시도해 주세요.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  // 로그인하지 않은 경우
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              접근 권한 없음
            </h1>
            <p className="text-gray-600 mb-6">
              프로필을 수정하려면 로그인이 필요합니다.
            </p>
            <button
              onClick={() => (window.location.href = "/login")}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              로그인하기
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            프로필 수정
          </h1>
          <p className="text-gray-600 text-center mt-2">
            개인 정보를 업데이트 하세요.
          </p>
        </div>

        {/* 피드백 메세지 */}
        {message && (
          <div
            className={`mb-4 p-3 rounded-md ${
              messageType === "success"
                ? "bg-green-100 border border-green-400 text-green-700"
                : "bg-red-100 border border-red-400 text-red-700"
            }`}
          >
            <p className="text-sm">{message}</p>
          </div>
        )}

        {/* 현재 사용자 정보 표시 */}
        <div className="mb-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-sm font-medium text-gray-700 mb-2">현재 정보</h3>
          <p className="text-sm text-gray-600">이메일: {user.email}</p>
          <p className="text-sm text-gray-600">현재 닉네임: {user.nickname}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nickname"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              새 닉네임
            </label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="새로운 닉네임을 입력하세요."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
              maxLength={20}
            />
            <p className="text-xs text-gray-500 mt-1">
              2~20자 사이로 입력해 주세요. ({nickname.length}/20)
            </p>
          </div>
          <button
            type="submit"
            disabled={
              isLoading ||
              !nickname.trim() ||
              nickname.trim() === user?.nickname
            }
            className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
              isLoading ||
              !nickname.trim() ||
              nickname.trim() === user?.nickname
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            }`}
          >
            {isLoading ? "업데이트 중" : "프로필 업데이트"}
          </button>
        </form>

        {/* 추가 액션 버튼들 */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full py-2 px-4 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
