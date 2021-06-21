import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: green[500],
  },
  failure: {
    backgroundColor: red[500],
  },
}));

const Test = ({ test }) => {
  const classes = useStyles();

  return (
    <ListItem>
      {test.state === 'passed' && (
        <Avatar className={classes.success}>
          <DoneIcon />
        </Avatar>
      )}
      {test.state === 'failed' && (
        <Avatar className={classes.failure}>
          <ErrorIcon />
        </Avatar>
      )}
      <ListItemText
        primary={test.title}
        secondary={test.err ? test.err : 'ok'}
      />
    </ListItem>
  );
};

// Test.propTypes = {
//   test: PropTypes.shape({
//     state: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     err: PropTypes.string,
//   }).isRequired,
//   classes: PropTypes.shape({
//     greenAvatar: PropTypes.string.isRequired,
//     redAvatar: PropTypes.string.isRequired,
//     secondary: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default Test;