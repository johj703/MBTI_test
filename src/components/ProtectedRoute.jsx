import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, children }) {
// 개발 환경에서는 항상 접근 허용
if(process.env.NODE_ENV === 'development') {
  return children
}

// 프로덕션 환경에서는 인증체크
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};