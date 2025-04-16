import { Link } from "react-router-dom";

const Home = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="mt-6 text-4xl font-extrabold text-gray-900">
            무료 성격 테스트
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요.
          </p>
        </div>

        <div className="mt-8">
          {user ? (
            // 로그인한 사용자에게 보여줄 컨텐츠
            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                안녕하세요, {user.nickname}님!
              </p>
              <Link
                to="Test"
                className="flex justify-center w-full px-4 py-3 text-lg font-medium text-white bg-blue-500 border border-transparent rounded-sm shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                테스트 시작하기
              </Link>
              <Link
                to="Profile"
                className="flex justify-center w-full px-4 py-3 text-lg font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                내 프로필
              </Link>
            </div>
          ) : (
            // 로그인하지 않은 사용자에게 보여줄 컨텐츠
            <div>
              <Link
                to="/login"
                className="flex justify-center w-full px-4 py-3 text-lg font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                로그인하기
              </Link>
              <div className="mt-4">
                <p className="text-gray-600">
                  계정이 없으신가요?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-blue-600 hover:text-blue-700"
                  >
                    회원가입하기
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
