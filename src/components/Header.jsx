import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 방어적 코드 추가
    if (typeof setUser !== "function") {
      console.error("setUser is not a function");
      // LocalStorage만 처리하고 페이지 새로고침
      localStorage.removeItem("user");
      window.location.reload();
      return;
    }
    // 정상 로그아웃 처리
    // 로컬 스토리지에서 사용자 정보 제거
    localStorage.removeItem("user");
    // 전역 사용자 상태 초기화
    setUser(null);
    // 로그인 페이지로 리디렉션
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-white shadow">
      <nav className="container px-6 py-3 mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            홈
          </Link>
          <div className="space-x-4">
            {user ? (
              <>
                <span className="text-gray-700">
                  {user.nickname}님 안녕하세요!
                </span>
                <Link to="/profile">프로필</Link>
                <Link to="/test">테스트</Link>
                <Link to="/results">결과</Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link to="/login">로그인</Link>
                <Link to="/signup">회원가입</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
