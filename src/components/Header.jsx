import { Link, useNavigate } from "react-router-dom"

const Header = ({user, setUser}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    }

  return (
    <header>
      <nav>
        <Link to="/">홈</Link>
        <div>
            {user ? (
                <>
                    <Link to="/profile">프로필</Link>
                    <Link to="/test">테스트</Link>
                    <Link to="/results">결과</Link>
                    <button onClick={handleLogout}>로그아웃</button>
                </>
            ) : (
                <>
                    <Link to="/login">로그인</Link>
                    <Link to="/signup">회원가입</Link>
                </>
            )}
        </div>
      </nav>
    </header>
  )
}

export default Header
