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
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">회원가입</h2>
          <p className="mt-2 text-sm text-gray-600">
            계정을 생성하여 서비스를 이용해보세요.
          </p>
        </div>
        <AuthForm mode="signup" onSubmit={handleSignup} />
        <div className="text-sm text-center">
          <p className="text-gray-600">
            이미 계정이 있으신가요?
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
