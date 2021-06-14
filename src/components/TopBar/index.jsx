import { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { useApp } from '../../lib/app';
import { useLocale } from '../../intl/IntlProvider';
import DrawerMenu from './DrawerMenu';
import UserMenu from './UserMenu';

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
  langSelect: {
    marginRight: theme.spacing(1),
  },
  hideWhenNotSmall: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  hideWhenSmall: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));

const TopBar = () => {
  const history = useHistory();
  const classes = useStyles();
  const { auth } = useApp();
  const { locale, setLocale } = useLocale();
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
            &lt;L<span className={classes.hideWhenSmall}>aboratoria</span>&gt;
            <span className={classes.hideWhenSmall}>Bootcamp</span>
          </Typography>
          <FormControl className={classes.langSelect}>
            <Select
              labelId="lang-select-label"
              id="lang-select"
              displayEmpty
              value={locale}
              onChange={e => setLocale(e.target.value)}
            >
              <MenuItem value="" disabled>Lang</MenuItem>
              <MenuItem value={'es-ES'}>
                <span className={classes.hideWhenNotSmall}>ES</span>
                <span className={classes.hideWhenSmall}>Español</span>
              </MenuItem>
              <MenuItem value={'pt-BR'}>
                <span className={classes.hideWhenNotSmall}>PT</span>
                <span className={classes.hideWhenSmall}>Português</span>
              </MenuItem>
            </Select>
          </FormControl>
          <UserMenu auth={auth} history={history} />
        </Toolbar>
      </AppBar>

      <div className={classes.offset} />

      <DrawerMenu
        drawerIsOpen={drawerIsOpen}
        setDrawerIsOpen={setDrawerIsOpen}
        history={history}
        auth={auth}
      />
    </Fragment>
  );
};

export default TopBar;
