import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Test from './Test';

const Suite = ({ suite }) => (
  <div>
    {suite.title && (
      <ListItem>
        <ListItemText primary={suite.title} />
      </ListItem>
    )}
    {suite.tests &&
      suite.tests.map(test => (
        <Test key={test.title} test={test} />
      ))}
    {suite.suites &&
      suite.suites.map(suite => (
        <Suite key={suite.title} suite={suite} />
      ))}
  </div>
);

// Suite.propTypes = {
//   suite: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     suites: PropTypes.arrayOf(PropTypes.shape({})),
//     tests: PropTypes.arrayOf(PropTypes.shape({})),
//   }).isRequired,
//   classes: PropTypes.shape({
//     greenAvatar: PropTypes.string.isRequired,
//     redAvatar: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default Suite;