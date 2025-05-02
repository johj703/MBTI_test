import { useEffect, useState } from "react";
import TestResultList from "../components/TestResultList";
import { getTestResults } from "../api/testResults";

const TestResultPage = ({ user }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const data = await getTestResults();
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
