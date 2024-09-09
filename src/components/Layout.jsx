import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Layout = ({ children, user, setUser }) => {
  const navigate = useNavigate();

  // 사용자가 로그인하지 않은 상태에서 페이지에 접근하려고 할 때, login 페이지로 리디렉션
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // 로그아웃 기능
  const handleLogout = () => {
    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem("token");
    // 사용자 상태 초기화
    setUser(null);
    // 로그인 페이지로 리디렉션
    navigate("/login");
  };

  return (
    <div>
      <header>
        <nav>
          <Link to="/">홈</Link>
          <div>
            {user ? (
              <>
                {/* 다른 페이지로 가는 버튼도 필요 합니다 */}
                <button onClick={handleLogout}>로그아웃</button>
              </>
            ) : (
              <Link to="/login">로그인</Link>
            )}
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
