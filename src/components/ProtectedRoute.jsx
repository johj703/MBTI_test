import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <div>ProtectedRoute</div>;
};

export default ProtectedRoute;
