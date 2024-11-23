import { Link } from "react-router-dom";
import Signup from "./Signup";

const Login = () => {
  const handleLogin = async (formData) => {
    try {
    } catch (error) {
      alert("로그인에 실패 했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <div>
      <h1>로그인 페이지 입니다.</h1>
      {/* <AuthForm mode="login" onSubmit={handleLogin} /> */}
      <div>
        <p>
          계정이 없으신가요? <Link to="/Signup">회원가입</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
