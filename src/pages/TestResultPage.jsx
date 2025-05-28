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

  // API에서 테스트 결과를 가져오는 함수수
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
    <div>
      <div>
        <div>
          <h1>내 테스트 결과</h1>

          {loading ? (
            <div>
              <p>결과를 불러오는 중...</p>
            </div>
          ) : error ? (
            <div>
              <p>{error}</p>
              <button onClick={fetchResults}>다시 시도</button>
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
