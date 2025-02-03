import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const Signup = () => {
  return (
    <div>
      <div>
        <p>회원가입</p>
        <AuthForm mode="signup" onSubmit={} />
        <div>
          <p>
            이미 계정이 있으신가요?{" "}
            <Link to="/login">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
};

export default Signup;
