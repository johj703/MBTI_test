import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, children }) {

// 프로덕션 환경에서는 인증체크
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};