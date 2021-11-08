import md5 from 'blueimp-md5';
import makeStyles from '@mui/styles/makeStyles';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const UserAvatar = ({ authUser, user, size }) => {
  const classes = useStyles();
  const className = classes[size] || '';
  const src = (
    user.github
      ? `https://github.com/${user.github}.png`
      : authUser.photoURL
        ? authUser.photoURL
        : `https://www.gravatar.com/avatar/${md5(user.email)}?s=${40}`
  );

  return (
    !src
      ? <AccountCircleIcon className={className} />
      : <Avatar className={className} alt={user.name} src={src} />
  );
};

export default UserAvatar;