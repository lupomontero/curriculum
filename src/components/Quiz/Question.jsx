import Content from '../Content';

const Question = ({ question, questionIdx, answer }) => (
  <div>
    <h3>{question.title}</h3>
    <Content html={question.description} />
    {question.answers.map((text, idx) => (
      <div key={`answer-${idx}`}>
        <Content html={text} />
        <input
          name={`question-${questionIdx}`}
          type={question.solution.length > 1 ? 'checkbox' : 'radio'}
          value={idx}
          defaultChecked={answer && answer.includes(idx)}
        />
      </div>
    ))}
  </div>
);

export default Question;