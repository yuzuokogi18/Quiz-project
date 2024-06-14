import React, { useState } from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const QuestionForm = ({ onAddQuestion }) => {
  const [question, setQuestion] = useState('');
  const [type, setType] = useState('multiple');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const questionData = { question, type, options: [], correctAnswer: '' };

    if (type === 'multiple') {
      questionData.options = options.map((option, index) => ({
        text: option,
        isCorrect: index.toString() === correctAnswer,
      }));
    } else if (type === 'truefalse') {
      questionData.options = [
        { text: 'Verdadero', isCorrect: correctAnswer === 'true' },
        { text: 'Falso', isCorrect: correctAnswer === 'false' },
      ];
    } else if (type === 'open') {
      questionData.correctAnswer = correctAnswer;
    }

    onAddQuestion(questionData);
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label>Pregunta:</Label>
      <Input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
      <Label>Tipo:</Label>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="multiple">Opción Múltiple</option>
        <option value="truefalse">Falso/Verdadero</option>
        <option value="open">Pregunta Abierta</option>
      </select>
      {type === 'multiple' && options.map((option, index) => (
        <div key={index}>
          <Label>Opción {index + 1}:</Label>
          <Input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        </div>
      ))}
      {type === 'multiple' && (
        <div>
          <Label>Respuesta Correcta (índice):</Label>
          <Input
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />
        </div>
      )}
      {type === 'truefalse' && (
        <div>
          <Label>Respuesta Correcta:</Label>
          <select value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)}>
            <option value="">Seleccionar</option>
            <option value="true">Verdadero</option>
            <option value="false">Falso</option>
          </select>
        </div>
      )}
      {type === 'open' && (
        <div>
          <Label>Respuesta Correcta:</Label>
          <Input
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />
        </div>
      )}
      <Button type="submit">Agregar Pregunta</Button>
    </form>
  );
};

export default QuestionForm;
