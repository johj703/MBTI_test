import React from "react";

const TestResultList = ({ results, user, onUpdate, onDelete }) => {
  return (
    <div>
      {userResults.map((result) => {
        <div>
          <div>
            <div>
              <h3>{result.mbtiType}</h3>
              <span>{formatDate(result.createAt || result.testDate)}</span>
            </div>
            <div>
              <div>
                <span>{result.inVisible ? "공개" : "비공개"}</span>
              </div>
            </div>
            <div>
              <button>{result.inVisible ? "숨기기" : "공개하기"}</button>
              <button>삭제</button>
            </div>
          </div>
        </div>;
      })}
    </div>
  );
};

export default TestResultList;
