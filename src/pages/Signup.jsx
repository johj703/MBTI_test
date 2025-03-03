import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { register } from "./../api/auth";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    try {
      // 실제 API 호출 대신 임시 처리
      console.log("회원가입 데이터", formData);

      // 모의 성공 응답
      alert("회원가입이 완료 되었습니다!");
      navigate("/login");
    } catch (error) {
      console.error("회원가입 에러: ", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <div>
      <div>
        <h1>회원가입</h1>
        <AuthForm mode="signup" onSubmit={handleSignup} />
        <div>
          <p>
            이미 계정이 있으신가요? <Link to="/login">로그인</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
