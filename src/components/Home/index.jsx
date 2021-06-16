import { Link, useParams } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';

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
    fontSize: '1.6em',
    [theme.breakpoints.up('sm')]: {
      fontSize: '2em',
    },
    fontWeight: 'bold',
  },
}));

const Home = () => {
  const theme = useTheme();
  const classes = useStyles();
  const { lang } = useParams();

  return (
    <div className={classes.root}>
      <Link
        to={`/${lang}/js`}
        className={classes.link}
        style={{
          backgroundColor: theme.palette.primary.light,
        }}
      >
        <FormattedMessage id="webDev" />
      </Link>
      <Link
        to={`/${lang}/ux`}
        className={classes.link}
        style={{
          backgroundColor: theme.palette.mint.main,
        }}
      >
        <FormattedMessage id="ux" />
      </Link>
    </div>
  )
};

export default Home;