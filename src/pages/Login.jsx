import { Link, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import { useState } from "react";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // localStorage에서 사용자 목록 가져오기
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // 일치하는 사용자 찾기(아이디와 비밀번호로 확인)
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      // 실제 서버 연동 시에는 이 부분에서 서버로 로그인 요청을 보내야 함.
      if (user) {
        // 로컬 스토리지에 사용자 정보 저장
        localStorage.setItem("user", JSON.stringify(user));

        // 전역 사용자 상태 업데이트
        setUser(userData);

        // 홈페이지로 리디렉션
        navigate("/");
      } else {
        alert("이메일 또는 비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.log("로그인 에러: ", error);
      alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            로그인 페이지 입니다.
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            계정 정보를 입력해서 로그인하세요.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="">이메일: </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="">비밀번호: </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-4 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            로그인
          </button>
        </form>
        <div className="text-sm text-center">
          <p className="text-gray-600">
            계정이 없으신가요?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
