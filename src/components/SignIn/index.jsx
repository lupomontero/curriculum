import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Loading from '../Loading';
import { useApp } from '../../lib/app';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const intl = useIntl();
  const { auth } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSending, setIsSending] = useState(false);
  const isPasswordRecovery = location.pathname.split('/').pop() === 'password-recovery';

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    auth.signIn(email, password)
      .then(() => navigate('/'))
      .catch((err) => {
        alert(err.message);
        setIsSending(false);
      });
  };

  return (
    <Container className={classes.root}>
      {isSending
        ? <Loading />
        : (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} direction="column">
              <Grid item>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Grid>
              {!isPasswordRecovery && (
                <Grid item>
                  <TextField
                    id="password"
                    label={intl.formatMessage({ id: 'password' })}
                    type="password"
                    variant="outlined"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </Grid>
              )}
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!email || (!isPasswordRecovery && !password)}
                >
                  <FormattedMessage
                    id={isPasswordRecovery ? 'recover-password' : 'signin'}
                  />
                </Button>
              </Grid>
              <Grid item>
                {isPasswordRecovery
                  ? <Link to="/signin">
                    <FormattedMessage id="signin" />
                  </Link>
                  : <Link to="/password-recovery">
                    <FormattedMessage id="forgot-password" />
                  </Link>}
              </Grid>
            </Grid>
          </form>
        )
      }
    </Container >
  );
};

export default SignIn;
