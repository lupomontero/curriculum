import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';

const Unit = ({ unit }) => (
  <Container>
    <h1>{unit.title}</h1>
    {Object.keys(unit.parts).map(key => (
      <div key={key}>
        <Link to={`${unit.slug}/${key}`}>{unit.parts[key].title}</Link>
      </div>
    ))}
  </Container>
);

export default Unit;