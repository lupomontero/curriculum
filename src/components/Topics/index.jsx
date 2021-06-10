import { useEffect, useState } from 'react';
import data from '../../lib/data';

const Topics = () => {
  const [topics, setTopics] = useState();

  // Subscribe to learning-objectives, projects and topics
  useEffect(() => {
    data.subscribe('topics', setTopics);

    return () => {
      data.unsubscribe('topics', setTopics);
    };
  }, []);

  console.log(topics);

  return (
    <div>
      Topics
    </div>
  )
};

export default Topics;