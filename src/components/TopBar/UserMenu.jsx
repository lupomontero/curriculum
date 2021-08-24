import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import UserAvatar from '../UserAvatar';


const UserMenu = ({ lang, auth, history }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  if (!auth.user) {
    return (
      <Button onClick={() => history.push(`/${lang}/signin`)} color="primary" variant="contained">
        <FormattedMessage id="signin" />
      </Button>
    );
  }

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleMenu}>
        <UserAvatar user={auth.user} profile={auth.profile} size="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => history.push(`/users/${auth.user.uid}`)}>
          <ListItemIcon>
            <UserAvatar user={auth.user} profile={auth.profile} />
          </ListItemIcon>
          <ListItemText primary={auth.profile.name} secondary={auth.profile.email} />
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => auth.signOut().then(handleClose)}>
          <ListItemIcon><LockOpenIcon /></ListItemIcon>
          <FormattedMessage id="signout" />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;