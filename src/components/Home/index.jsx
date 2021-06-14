import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  link: {
    fontFamily: theme.typography.h2.fontFamily,
    height: '50vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 'bold',
  },
}));

const Home = () => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link
        to="/js"
        className={classes.link}
        style={{
          backgroundColor: theme.palette.primary.light,
        }}
      >
        JS
      </Link>
      <Link
        to="/ux"
        className={classes.link}
        style={{
          backgroundColor: theme.palette.mint.main,
        }}
      >
        UX
      </Link>
    </div>
  )
};

export default Home;