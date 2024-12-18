import { Link, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import { useState } from "react";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormdata] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormdata(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 실제 서버 연동 시에는 이 부분에서 서버로 로그인 요청을 보내야 함.
      if(FormData.email && FormData.password){
        const userData = {
          email: FormData.email,
          id: Date.now(), // 임시 사용자 ID
        };

        // 로컬 스토리지에 사용자 정보 저장
        localStorage.setItem('user', JSON.stringify(userData));
        // 전역 사용자 상태 업데이트
        setUser(userData);
        // 홈페이지로 리디렉션
        navigate('/');
      }
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
          계정이 없으신가요? <Link to="/signup">회원가입</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
