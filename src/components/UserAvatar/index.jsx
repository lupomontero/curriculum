import md5 from 'blueimp-md5';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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

const UserAvatar = ({ user, profile, size }) => {
  const classes = useStyles();
  const className = classes[size] || '';
  const src = (
    profile.github
      ? `https://github.com/${profile.github}.png`
      : user.photoURL
        ? user.photoURL
        : `https://www.gravatar.com/avatar/${md5(profile.email)}?s=${40}`
  );

  return (
    !src
      ? <AccountCircleIcon className={className} />
      : <Avatar className={className} alt={profile.name} src={src} />
  );
};

export default UserAvatar;