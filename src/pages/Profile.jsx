import { useState } from "react";

const Profile = ({ user, setUser }) => {
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [message, setMessage] = useState("");

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        <form onSubmit={handleSubmit}>
          <div>
            <label>닉네임</label>
            <input onChange={handleNicknameChange} />
          </div>
          <button type="submit">프로필 업데이트</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
