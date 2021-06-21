import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FormattedMessage } from 'react-intl';

const Summary = ({ stats }) => (
  <ListItem>
    <ListItemText
      primary={
        stats.failures ? (
          <FormattedMessage
            id="exercise-test-results.failures"
            values={{ failures: stats.failures, tests: stats.tests }}
          />
        ) : (
          <FormattedMessage
            id="exercise-test-results.passes"
            values={{ passes: stats.passes }}
          />
        )
      }
      secondary={`(${stats.duration}ms)`}
    />
  </ListItem>
);

// Summary.propTypes = {
//   stats: PropTypes.shape({
//     tests: PropTypes.number,
//     failures: PropTypes.number,
//     passes: PropTypes.number,
//     duration: PropTypes.number,
//   }).isRequired,
// };

export default Summary;