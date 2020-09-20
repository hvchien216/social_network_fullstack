import { HOME_ROUTES } from '@/constant/index';
import { layoutProps } from '@/typings/index';
import {
  AppBar,
  Badge,
  Divider,
  Drawer as DrawerMui,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
  Radio,
  ThemeProvider,
  FormControlLabel,
  Switch,
  Avatar,
  MenuItem,
  Menu
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleIcon from '@material-ui/icons/People';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState
} from 'react';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '@/theme/index';
import { useDarkModeStore } from '@/contexts/darkmode';
import useAuth from '@/contexts/auth';
import MyAvatar from '../Avatar';

const icons: any = {
  HomeIcon: <HomeIcon />,
  AccountCircleIcon: <AccountCircleIcon />,
  PeopleIcon: <PeopleIcon />
};
function Drawer({
  setPageCrt,
  open
}: {
  setPageCrt(a: string): void;
  open?: boolean;
}) {
  const classes = useStyles();
  const router = useRouter();
  return (
    <div
      className={clsx(
        classes.contentDrawer,
        !open && classes.drawerPaperClose
      )}>
      <div className={classes.drawerHeader} />
      <List style={{ width: 240 }}>
        {HOME_ROUTES.map(({ name, to, icon }) => {
          return (
            <ListItem
              key={name}
              button
              onClick={() => {
                setPageCrt(name);
                router.push(to);
              }}>
              <ListItemIcon>{icons[icon]}</ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

function Layout({ children, hiddenAppBar }: layoutProps) {
  const classes = useStyles();
  const menuId = 'primary-search-account-menu';
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();
  const [pageCrt, setPageCrt] = useState('Home');
  const [open, setOpen] = useState(true);
  const { darkMode, setDarkMode } = useDarkModeStore();
  const isMenuOpen = Boolean(anchorEl);
  const { user, logout } = useAuth();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const handleProfileMenuOpen = (event: ChangeEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          logout();
        }}>
        Logout
      </MenuItem>
    </Menu>
  );

  if (hiddenAppBar) return <>{children}</>;
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap={isMobile}>
            Social Network
          </Typography>
          <p className={classes.dividerVertical}>|</p>
          <Typography
            variant="h6"
            color="inherit"
            noWrap={isMobile}
            className={classes.title}>
            {pageCrt}
          </Typography>
          <FormControlLabel
            className=""
            control={
              <Switch
                onChange={() => setDarkMode(!darkMode)}
                checked={darkMode}
              />
            }
            label="Dark Mode"
          />
          <IconButton size="small" onClick={handleProfileMenuOpen}>
            <MyAvatar name={user?.name} avatar={user?.avatar} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Hidden mdUp>
        <DrawerMui
          variant="temporary"
          anchor={'left'}
          open={open}
          classes={{
            paper: clsx(classes.drawerPaper)
          }}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}>
          <Drawer setPageCrt={setPageCrt} open={open} />
        </DrawerMui>
      </Hidden>
      <Hidden smDown>
        <DrawerMui
          variant="permanent"
          anchor={'left'}
          open={open}
          classes={{
            paper: clsx(
              classes.drawerPaper,
              !open && classes.drawerPaperClose
            )
          }}>
          <Drawer setPageCrt={setPageCrt} open={open} />
        </DrawerMui>
      </Hidden>

      <main className={classes.content}>{children}</main>
      {renderMenu}
    </div>
  );
}

export default Layout;

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    minHeight: '100vh',
    zIndex: 1,
    overflow: 'hidden'
  },
  title: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerHeader: { ...theme.mixins.toolbar },
  drawerPaper: {
    position: 'relative',
    top: '0',
    left: '0',
    whiteSpace: 'nowrap',
    height: '100%',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: '0px'
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
    backgroundColor: theme.palette.background.default,
    maxWidth: '530px',
    minWidth: '280px',
    minHeight: '100%',
    margin: '0 auto',
    padding: theme.spacing(8)
  },
  dividerVertical: {
    padding: '0 10px'
  },
  contentDrawer: {
    position: 'fixed',
    top: '0',
    left: '0',
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.enteringScreen
    })
    // transition: theme.transitions.create('width', {
    //   // easing: theme.transitions.easing.sharp,
    //   // duration: theme.transitions.duration.leavingScreen
    // })
  }
}));
