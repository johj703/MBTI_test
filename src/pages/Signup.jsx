import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { register } from "./../api/auth";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    try {
      // 이미 존재하는 사용자인지 확인
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const userExists = existingUsers.some((user) => user.id === formData.id);

      if (userExists) {
        alert("이미 존재하는 아이디입니다.");
        return;
      }

      // 새 사용자 정보 추가
      const useUser = {
        ...formData,
        createAt: new Date().toISOString(), // 가입 시간 기록
      };

      // 사용자 목록에 추가
      existingUsers.push(newUser);
      localStorage.setItem("user", JSON.stringify(existingUsers));

      alert("회원가입이 완료 되었습니다!");
      navigate("/login");
    } catch (error) {
      console.error("회원가입 에러: ", error);
      alert("회원가입 중 오류가 발생했습니다.");
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
