import { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Layout = ({ children, user, setUser }) => {
  const navigate = useNavigate();

  // 사용자가 로그인하지 않은 상태에서 페이지에 접근하려고 할 때, login 페이지로 리디렉션
  useEffect(() => {
    if (!user) {
      Navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div>
      <header>
        <nav>
          <Link to="/">홈</Link>
          <div>
            {user ? (
              <>
                {/* 다른 페이지로 가는 버튼도 필요 합니다 */}
                <button>로그아웃</button>
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
