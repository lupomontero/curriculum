import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import data from '../../lib/data';
import Loading from '../Loading';
import Projects from './Projects';
import Topics from './Topics';

const Track = () => {
  const { track } = useParams();
  const [learningObjectives, setLearningObjectives] = useState();
  const [projects, setProjects] = useState();
  const [topics, setTopics] = useState();

  useEffect(() => {
    data.subscribe('learning-objectives', setLearningObjectives);
    data.subscribe('projects', setProjects);
    data.subscribe('topics', setTopics);

    return () => {
      data.unsubscribe('learning-objectives', setLearningObjectives);
      data.unsubscribe('projects', setProjects);
      data.unsubscribe('topics', setTopics);
    };
  }, []);

  if (!learningObjectives || !projects || !topics) {
    return <Loading />;
  }

  return (
    <div>
      <Projects projects={projects} track={track} />
      <Topics topics={topics} track={track} />
    </div>
  )
};

export default Track;