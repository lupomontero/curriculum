import { Link } from 'react-router-dom';

const ExercisesList = ({ part, exercises }) => (
  <div>
    {exercises.map(exercise => (
      <div key={exercise.slug}>
        <Link to={`${part.slug}/${exercise.slug}`}>
          {exercise.title}
        </Link>
      </div>
    ))}
  </div>
);

export default ExercisesList;