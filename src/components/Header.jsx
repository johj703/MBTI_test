import { Link, useNavigate } from "react-router-dom";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
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
