import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Question from './Question';

const createInitialState = questions => questions.reduce(
  (memo, _, idx) => ({ ...memo, [idx]: [] }),
  {},
);

const Quiz = ({ part }) => {
  const [state, setState] = useState(createInitialState(part.questions));

  const handleChange = (e) => {
    const questionIdx = parseInt(e.target.name.split('-')[1], 10);
    const answerIdx = parseInt(e.target.value, 10);
    setState(prevState => ({
      ...prevState,
      [questionIdx]: (
        prevState[questionIdx] && prevState[questionIdx].includes(answerIdx)
          ? prevState[questionIdx].filter(v => v !== answerIdx)
          : (prevState[questionIdx] || []).concat(answerIdx).sort()
      ),
    }));
  };

  const handleSubmit = () => {
    console.log('submit!', state);
  };

  return (
    <div onChange={handleChange}>
      {part.questions.map((question, idx) => (
        <Question
          key={`question-${idx}`}
          question={question}
          questionIdx={idx}
          answer={state[idx]}
        />
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default Quiz;