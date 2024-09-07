import { Link } from 'react-router-dom';
const Layout = ({children}) => {
  return (
    <div>
        <header>
            <nav>
                <Link to="/">
                    홈
                </Link>
                <div>
                    {user ? (
                        <>
                            {/* 다른 페이지로 가는 버튼도 필요 합니다 */}
                            <button>
                                로그아웃
                            </button>
                        </>
                    ) : (
                        <Link to="/login">
                            로그인
                        </Link>
                    )}
                </div>
            </nav>
        </header>
        <main>{children}</main>
    </div>
  )
}

export default Layout
