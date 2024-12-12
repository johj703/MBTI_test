import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/Profile";
import TestResultPage from "./pages/TestResultPage";
import TestPage from "./pages/TestPage";

function App() {
  const [user, setUser] = useState(() => {
    // 페이지 로드 시 로컬 스토리지에서 user 정보 확인
    const saveUser = localStorage.getItem('user');
    return saveUser ? JSON.parse(savedUser) : null;
  });
  
  return (
    <Router>
      <Layout user={user} setUser={setUser}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user}>
                <ProfilePage user={user} setUser={setUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/test"
            element={
              <ProtectedRoute user={user}>
                <TestPage user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/results"
            element={
              <ProtectedRoute user={user}>
                <TestResultPage user={user} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
