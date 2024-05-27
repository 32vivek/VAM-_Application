import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    backgroundColor: '#3C565B', // Set the background color of the AppBar
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [dashboardOpen, setDashboardOpen] = React.useState(false);
    const [visitorOpen, setVisitorOpen] = React.useState(false);
    const [startingUpOpen, setStartingUpOpen] = React.useState(false);
    const [settingsOpen, setSettingsOpen] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleItemClick = (route) => {
        navigate(route);
    };

    const handleDashboardClick = () => {
        setDashboardOpen(!dashboardOpen);
    };

    const handleVisitorClick = () => {
        setVisitorOpen(!visitorOpen);
    };

    const handleStartingUpClick = () => {
        setStartingUpOpen(!startingUpOpen);
    };

    const handleSettingsClick = () => {
        setSettingsOpen(!settingsOpen);
    };

    const isActiveRoute = (route) => location.pathname.startsWith(route);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        USER
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                    {open && (
                        <Typography variant="h6" sx={{ marginLeft: 'auto', marginRight: '16px' }}>
                            VAM Application
                        </Typography>
                    )}
                </DrawerHeader>
                <Divider />
                <List>
                    {[
                        { text: 'Home', icon: <HomeIcon />, route: '/home' }
                    ].map((item) => (
                        <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={() => handleItemClick(item.route)}
                                selected={isActiveRoute(item.route)}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                        color: isActiveRoute(item.route) ? theme.palette.primary.main : 'inherit'
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={handleDashboardClick}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                            selected={isActiveRoute('/dashboard')}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: isActiveRoute('/dashboard') ? theme.palette.primary.main : 'inherit'
                                }}
                            >
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
                            {dashboardOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={dashboardOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton
                                    sx={{ pl: 4 }}
                                    onClick={() => handleItemClick('/dashboard/visitorsstatus')}
                                    selected={isActiveRoute('/dashboard/visitorsstatus')}
                                >
                                    <ListItemText primary="Visitor Status" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={handleVisitorClick}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                            selected={isActiveRoute('/visitor')}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: isActiveRoute('/visitor') ? theme.palette.primary.main : 'inherit'
                                }}
                            >
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="Visitor" sx={{ opacity: open ? 1 : 0 }} />
                            {visitorOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={visitorOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton
                                    sx={{ pl: 4 }}
                                    onClick={() => handleItemClick('/visitor/visitoractivity')}
                                    selected={isActiveRoute('/visitor/visitoractivity')}
                                >
                                    <ListItemText primary="Visitor Entry" />
                                </ListItemButton>
                                <ListItemButton
                                    sx={{ pl: 4 }}
                                    onClick={() => handleItemClick('/visitor/subitem1')}
                                    selected={isActiveRoute('/visitor/subitem2')}
                                >
                                    <ListItemText primary="Pre Request" />
                                </ListItemButton>
                                <ListItemButton
                                    sx={{ pl: 4 }}
                                    onClick={() => handleItemClick('/visitorstatus')}
                                    selected={isActiveRoute('/visitorstatus')}
                                >
                                    <ListItemText primary="Visitor Status" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={handleStartingUpClick}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                            selected={isActiveRoute('/startingup')}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: isActiveRoute('/startingup') ? theme.palette.primary.main : 'inherit'
                                }}
                            >
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Starting Up" sx={{ opacity: open ? 1 : 0 }} />
                            {startingUpOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={startingUpOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton
                                    sx={{ pl: 4 }}
                                    onClick={() => handleItemClick('/startingup/subitem1')}
                                    selected={isActiveRoute('/startingup/subitem1')}
                                >
                                    <ListItemText primary="Purpose" />
                                </ListItemButton>
                                <ListItemButton
                                    sx={{ pl: 4 }}
                                    onClick={() => handleItemClick('/startingup/purpose')}
                                    selected={isActiveRoute('/startingup/purpose')}
                                >
                                    <ListItemText primary="Plant" />
                                </ListItemButton>
                                <ListItemButton
                                    sx={{ pl: 4 }}
                                    onClick={() => handleItemClick('/startingup/plant')}
                                    selected={isActiveRoute('/startingup/plant')}
                                >
                                    <ListItemText primary="Unit Settings" />
                                </ListItemButton>
                                <ListItemButton
                                    sx={{ pl: 4 }}
                                    onClick={() => handleItemClick('/startingup/unit')}
                                    selected={isActiveRoute('/startingup/unit')}
                                >
                                    <ListItemText primary="Summary Report" />
                                </ListItemButton>
                                <ListItemButton
                                    sx={{ pl: 4 }}
                                    onClick={() => handleItemClick('/startingup/summary')}
                                    selected={isActiveRoute('/startingup/summary')}
                                >
                                    <ListItemText primary="Driver Licence" />
                                </ListItemButton>
                                <ListItemButton
                                    sx={{ pl: 4 }}
                                    onClick={() => handleItemClick('/startingup/d-licence')}
                                    selected={isActiveRoute('/startingup/d-licence')}
                                >
                                    <ListItemText primary="Vehicle Licence" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={handleSettingsClick}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                            selected={isActiveRoute('/settings')}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: isActiveRoute('/settings') ? theme.palette.primary.main : 'inherit'
                                }}
                            >
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Settings" sx={{ opacity: open ? 1 : 0 }} />
                            {settingsOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton
                                    sx={{ pl: 4 }}
                                    onClick={() => handleItemClick('/settings/department')}
                                    selected={isActiveRoute('/settings/department')}
                                >
                                    <ListItemText primary="Department" />
                                </ListItemButton>
                                <ListItemButton
                                    sx={{ pl: 4 }}
                                    onClick={() => handleItemClick('/settings/contact')}
                                    selected={isActiveRoute('/settings/contact')}
                                >
                                    <ListItemText primary="Contact" />
                                </ListItemButton>
                                <ListItemButton
                                    sx={{ pl: 4 }}
                                    onClick={() => handleItemClick('/settings/user')}
                                    selected={isActiveRoute('/settings/user')}
                                >
                                    <ListItemText primary="User" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </ListItem>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Outlet />
                {/* <Footer /> */}
            </Box>
        </Box>
    );
}
