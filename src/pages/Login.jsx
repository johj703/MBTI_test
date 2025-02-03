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
      } else {
        throw new Error('이메일과 비밀번호를 입력해 주세요.');
      }
    } catch (error) {
      alert(error.message || "로그인에 실패 했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <div className="">
      <h1>로그인 페이지 입니다.</h1>
      <form onSubmit={handleSubmit} className="">
        <div>
          <label className="">이메일: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className=""
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
            className=""
            required
          />
        </div>
        <button type="submit" className="">
          로그인
        </button>
      </form>
      <div className="">
        <p>
          계정이 없으신가요? <Link to="/signup" className="">회원가입</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
