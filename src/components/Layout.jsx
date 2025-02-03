import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Layout = ({ children, user, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // 현재 페이지가 public 페이지가 아니고, 사용자가 로그인하지 않은 경우에만 리다이렉트트
    if(!publicPages.includes(location.pathname) && !user) {
      navigate("/login");
    }
  }, [user, navigate, location]);

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
        <nav className="flex space-x-3">
          <Link to="/">홈</Link>
          <div className="space-x-4">
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
      <main className="container pt-10 mx-auto main">{children}</main>
    </div>
  );
};

export default Layout;
