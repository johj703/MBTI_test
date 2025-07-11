import axios from "axios";

const API_URL = "https://moneyfulpublicpolicy.co.kr";

// 회원가입 요청
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// 로그인 요청
export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// 유저 프로필 가져오기
export const getUserProfile = async (token) => {
  const response = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 유저 프로필 업데이트
export const updateProfile = async (formData) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/profile`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
