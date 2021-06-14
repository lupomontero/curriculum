import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PeopleIcon from '@material-ui/icons/People';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
}));

const DrawerMenu = ({ drawerIsOpen, setDrawerIsOpen, history, auth }) => {
  const classes = useStyles();
  return (
    <Drawer
      anchor="left"
      open={drawerIsOpen}
      onClick={() => setDrawerIsOpen(false)}
    >
      <div className={classes.list}>
        <List>
          <ListItem button onClick={() => history.push('/')}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary={<FormattedMessage id="home" />} />
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
      </div>
    </Drawer>
  );
};

export default DrawerMenu;