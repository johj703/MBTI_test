import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { register } from './../api/auth';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    try {
      await register(formData);
    } catch(error) {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  }
  return (
    <div>
      <div>
        <p>회원가입</p>
        <AuthForm mode="signup" onSubmit={handleSignup} />
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
