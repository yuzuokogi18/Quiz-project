import React, { useState } from 'react';
import QuestionForm from '../molecules/QuestionForm';
import QuizPreview from '../molecules/QuizPreview';
import Button from '../atoms/Button';

const QuizBuilder = () => {
  const [questions, setQuestions] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const handleAddQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  return (
    <div>
      <h1>Quiz Interactivo</h1>
      <QuestionForm onAddQuestion={handleAddQuestion} />
      <Button onClick={() => setShowPreview(!showPreview)}>Mostrar Vista Previa</Button>
      {showPreview && <QuizPreview questions={questions} />}
    </div>
  );
};

export default QuizBuilder;
