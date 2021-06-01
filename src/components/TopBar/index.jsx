import { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PeopleIcon from '@material-ui/icons/People';
import WorkIcon from '@material-ui/icons/Work';
// import { useApp } from '../../lib/app';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
  list: {
    width: 250,
  },
}));

const TopBar = () => {
  const history = useHistory();
  const classes = useStyles();
  // const { auth } = useApp();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  return (
    <Fragment>
      <AppBar>
        <Toolbar>
          <IconButton
            onClick={() => setDrawerIsOpen(true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Bootcamp Admin
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.offset} />

      <Drawer
        anchor="left"
        open={drawerIsOpen}
        onClick={() => setDrawerIsOpen(false)}
      >
        <div className={classes.list}>
          <List>
            <ListItem button onClick={() => history.push('/')}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={() => history.push('/projects')}>
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary={<FormattedMessage id="projects" />} />
            </ListItem>
            <ListItem button onClick={() => history.push('/topics')}>
              <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
              <ListItemText primary={<FormattedMessage id="topics" />} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={() => console.log('sign out!')}>
              <ListItemIcon><LockOpenIcon /></ListItemIcon>
              <ListItemText primary="Sign out" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </Fragment>
  );
};

export default TopBar;
