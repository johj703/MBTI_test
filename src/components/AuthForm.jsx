import { useState } from "react";

const AuthForm = ({ mode, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickname: mode === "signup" ? "" : undefined, // 회원가입일 경우에만 초기화
  });

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 이벤트 방지
    onSubmit(formData); // 부모 컴포넌트로 formData 전달
  };

  return (
    <form>
      <input
        type="text"
        name="id"
        value={formData.id}
        placeholder="아이디"
        required
      />
      {mode === "signup" && (
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          placeholder="닉네임"
          required
          className="w-full p-4 border border-gray-300 rounded-lg"
        />
      )}
      <button type="submit">{mode === "login" ? "로그인" : "회원가입"}</button>
    </form>
  );
};

export default AuthForm;
