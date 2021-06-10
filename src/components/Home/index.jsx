import { useEffect, useState } from 'react';
import data from '../../lib/data';

const Home = () => {
  const [learningObjectives, setLearningObjectives] = useState();
  const [projects, setProjects] = useState();
  const [topics, setTopics] = useState();

  // Subscribe to learning-objectives, projects and topics
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

  console.log(learningObjectives);
  console.log(projects);
  console.log(topics);

  return (
    <div>
      Home
    </div>
  )
};

export default Home;