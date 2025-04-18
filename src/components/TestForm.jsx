import React, { useState } from 'react';
import { questions } from '../data/question';

const TestForm = ({ onSubmit }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(answers);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-gray-100 rounded shadow-md">
      {questions.map((q, index) => (
        <div key={q.id} className="mb-4">
          <p className="font-semibold">{q.question}</p>
          {q.options.map((option, i) => (
            <label key={i} className="block">
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                checked={answers[index] === option}
                onChange={() => handleChange(index, option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button type="submit" className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
        제출하기
      </button>
    </form>
  );
};

export default TestForm;