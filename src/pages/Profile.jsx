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

    if (!nickname.trim().length < 2) {
      setMessage("닉네임은 최소 2글자 이상이어야 합니다.");
      setMessageType("error");
      return;
    }

    if (!nickname.trim() === user?.nickname) {
      setMessage("현재 닉네임과 동일합니다.");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // localStorage에서 현재 사용자 정보 업데이트
      const updateUser = { ...user, nickname: nickname.trim() };
      localStorage.setItem("user", JSON.stringify(updateUser));

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
  return (
    <div>
      <div>
        <div>
          <h1>프로필 수정</h1>
          <p>개인 정보를 업데이트 하세요.</p>
        </div>

        {/* 피드백 메세지 */}
        {message && (
          <div>
            <p>{message}</p>
          </div>
        )}

        {/* 현재 사용자 정보 표시 */}
        <div>
          <h3>현재 정보</h3>
          <p>이메일: {user.email}</p>
          <p>현재 닉네임: {user.nickname}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nickname">새 닉네임</label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="새로운 닉네임을 입력하세요."
              disabled={isLoading}
              maxLength={20}
            />
            <p>2~20자 사이로 입력해 주세요. ({nickname.length}/20)</p>
          </div>
          <button
            type="submit"
            disabled={
              isLoading ||
              !nickname.trim() ||
              nickname.trim() === user?.nickname
            }
          >
            {isLoading ? "업데이트 중" : "프로필 업데이트"}
          </button>
        </form>

        {/* 추가 액션 버튼들 */}
        <div>
          <button onClick={() => (window.location.href = "/")}>
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
