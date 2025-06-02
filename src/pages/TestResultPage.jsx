import { useEffect, useState } from "react";
import TestResultList from "../components/TestResultList";
import { getTestResults } from "../api/testResults";

const TestResultPage = ({ user }) => {
  // 테스트 결과 목록을 저장하는 state
  const [results, setResults] = useState([]);
  // 로딩 상태를 관리하는 state
  const [loading, setLoading] = useState(true);
  // 에러 메세지를 저장하는 state
  const [error, setError] = useState(null);

  // API에서 테스트 결과를 가져오는 함수
  const fetchResults = async () => {
    try {
      setLoading(true);
      const data = await getTestResults(); // API 호출
      setResults(data);
      setError(null);
    } catch (error) {
      console.error("결과 불러오기 오류: ", error);
      setError("테스트 결과를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleUpdate = () => {
    fetchResults();
  };

  const handleDelete = () => {
    fetchResults();
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col items-center justify-center w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="w-full max-w-2xl bg-white">
          <h1 className="mb-6 text-3xl font-bold text-center">
            내 테스트 결과
          </h1>

          {loading ? (
            <div className="py-8 text-center">
              <p className="text-lg text-gray-600">결과를 불러오는 중...</p>
            </div>
          ) : error ? (
            <div className="py-8 text-center">
              <p className="text-lg text-red-600">{error}</p>
              <button
                onClick={fetchResults}
                className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                다시 시도
              </button>
            </div>
          ) : (
            <TestResultList
              results={results}
              user={user}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TestResultPage;
