import { useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Content from '../Content';
import ExercisesList from './ExercisesList';
import Quiz from '../Quiz';

const Part = ({ topic, url }) => {
  const params = useParams();
  const part = topic.syllabus[params.unit].parts[params.part];
  const exercises = Object.keys(part.exercises || {}).map(key => ({
    ...part.exercises[key],
    slug: key,
  }));
  return (
    <Container>
      <h1>{part.title}</h1>
      <Content html={part.body} />
      {!!exercises.length && <ExercisesList part={part} exercises={exercises} />}
      {!!part.questions && <Quiz part={part} />}
    </Container>
  );
};

export default Part;