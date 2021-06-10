import { useEffect, useState } from 'react';
import data from '../../lib/data';
import Loading from '../Loading';
import Projects from './Projects';

const Home = () => {
  const [tracks, setTracks] = useState();
  const [learningObjectives, setLearningObjectives] = useState();
  const [projects, setProjects] = useState();
  const [topics, setTopics] = useState();

  useEffect(() => {
    data.subscribe('tracks', setTracks);
    data.subscribe('learning-objectives', setLearningObjectives);
    data.subscribe('projects', setProjects);
    data.subscribe('topics', setTopics);

    return () => {
      data.unsubscribe('tracks', setTracks);
      data.unsubscribe('learning-objectives', setLearningObjectives);
      data.unsubscribe('projects', setProjects);
      data.unsubscribe('topics', setTopics);
    };
  }, []);

  if (!tracks || !learningObjectives || !projects || !topics) {
    return <Loading />;
  }

  console.log(tracks);

  return (
    <div>
      <Projects projects={projects} />
    </div>
  )
};

export default Home;