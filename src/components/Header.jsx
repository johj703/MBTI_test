import { Link, useNavigate } from "react-router-dom"

const Header = ({user, onLogout}) => {
    const navigate = useNavigate();

  return (
    <header>
      <nav className="flex space-x-3">
        <Link to="/">홈</Link>
        <div className="space-x-4">
            {user ? (
                <>
                    <Link to="/profile">프로필</Link>
                    <Link to="/test">테스트</Link>
                    <Link to="/results">결과</Link>
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
