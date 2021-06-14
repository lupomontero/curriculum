import { useEffect, useState } from 'react';
import { Link, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Loading from '../Loading';
import Part from '../Part';
import data from '../../lib/data';

const Unit = ({ topic, url }) => {
  const params = useParams();
  const unit = topic.syllabus[params.unit];

  return (
    <Container>
      <h1>{unit.title}</h1>
      {Object.keys(unit.parts).map(key => (
        <div key={key}>
          <Link to={`${url}/${params.unit}/${key}`}>
            {unit.parts[key].title}
          </Link>
        </div>
      ))}
    </Container>
  );
};

const UnitsList = ({ topic, url }) => (
  <>
    <h1>{topic.title}</h1>
    {Object.keys(topic.syllabus).map(key => (
      <div key={key}>
        <Link to={`${url}/${key}`}>
          {topic.syllabus[key].title}
        </Link>
      </div>
    ))}
  </>
);

const Topic = () => {
  let { path, url } = useRouteMatch();
  console.log('path, url', path, url);
  console.log('useParams()', useParams());
  const { slug } = useParams();
  const [topic, setTopic] = useState();

  useEffect(() => {
    data.subscribe(`topics/${slug}`, setTopic);

    return () => {
      data.unsubscribe(`topics/${slug}`, setTopic);
    };
  }, [slug]);

  if (!topic) {
    return <Loading />;
  }

  return (
    <Container>
      <Switch>
        <Route path={`${path}/:unit/:part`}>
          <Part topic={topic} url={url} />
        </Route>
        <Route path={`${path}/:unit`}>
          <Unit topic={topic} url={url} />
        </Route>
        <Route exact path={path}>
          <UnitsList topic={topic} url={url} />
        </Route>
      </Switch>
    </Container>
  );
};

export default Topic;