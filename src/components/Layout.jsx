import { useEffect } from "react";
import {useLocation, useNavigate } from "react-router-dom";
import Header from './Header';

const Layout = ({ children, user, setUser }) => {
  const navigate = useNavigate();
  // 현재 페이지 경로 정보를 가지고 오는 hook
  const location = useLocation();

  // 로그인이 필요없는 페이지들 경로
  const publicPages = ['/', '/login', '/signup'];

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    // 현재 페이지가 public 페이지가 아니고, 사용자가 로그인하지 않은 경우에만 리다이렉트
    if(!publicPages.includes(location.pathname) && !user) {
      navigate("/login");
    }
    // 의존성 배열: 이 값들이 변경될 때마다 effect 실행
  }, [user, navigate, location, publicPages]);

  return (
    <div>
      <Header user={user} onLogout={handleLogout} />
      <main className="container pt-10 mx-auto main">{children}</main>
    </div>
  );
};

export default Layout;
