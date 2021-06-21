import React from 'react';
import List from '@material-ui/core/List';
import Suite from './Suite';
import Summary from './Summary';

const TestResults = ({ results }) => (
  <List>
    <Suite suite={results.suite} />
    <Summary stats={results.stats} />
  </List>
);

// TestResults.propTypes = {
//   classes: PropTypes.shape({
//     list: PropTypes.string.isRequired,
//   }).isRequired,
//   testResults: PropTypes.shape({
//     suite: PropTypes.shape({}).isRequired,
//     stats: PropTypes.shape({}).isRequired,
//   }).isRequired,
// };

export default TestResults;