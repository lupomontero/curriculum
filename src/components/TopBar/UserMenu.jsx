import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import UserAvatar from '../UserAvatar';


const UserMenu = ({ lang, auth }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  if (!auth.authUser || !auth.user) {
    return (
      <Button
        component={Link}
        to={`/${lang}/signin`}
        color="primary"
        variant="contained"
      >
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
      <IconButton onClick={handleMenu} size="large">
        <UserAvatar authUser={auth.authUser} user={auth.user} size="small" />
      </IconButton>
      <Menu
        sx={{
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
        }}
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
        <MenuItem component={Link} to={`/users/${auth.user.uid}`}>
          <ListItemIcon>
            <UserAvatar authUser={auth.authUser} user={auth.user} />
          </ListItemIcon>
          <ListItemText primary={auth.user.name} secondary={auth.user.email} />
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