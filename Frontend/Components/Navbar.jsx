import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import CssBaseline from '@mui/material/CssBaseline';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@emotion/react';
export default function Navbar() {
  const [mail, setmail] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:3000/admin/me', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(resp => resp.json()).then((data) => { setmail(data.username) });
  }, [])
  if (mail) {
    return (<>
      <AdminAppBar></AdminAppBar>
    </>
    )
  }
  return (
    <>
      <ForallAppBar></ForallAppBar>
    </>
  )
}

function trash() {
  return (<>
    {/* <ResponsiveAppBar></ResponsiveAppBar> */}
    {/* <div style={{ display: 'flex', justifyContent: 'space-between', padding: 20, backgroundColor: 'gray', borderRadius: 10 }} >
                <div>
                    <Typography variant='h5' > Course Seller</Typography>
                </div>
                <div style={{ display: 'flex' }} >
                <div style={{ marginRight: 10 }} >
                        <Button variant="contained" href='/all'  >All</Button> </div>
                    <div style={{ marginRight: 10 }} >
                        <Button variant="contained" href='/'  >Signup</Button> </div>
                    <div> <Button variant="contained" href='/login' >Login</Button> </div>
                </div>
            </div> */}
  </>
  )

}

function ForallAppBar(props) {
  const drawerWidth = 240;
  const navItems = [
    { text: 'Login', link: '/login',k:1 },
    { text: 'Register', link: '/',k:2 },
  ];
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const handleClick = () => {
    console.log("i am clicked");
  }
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Course Seller
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.k} disablePadding>
            <ListItemButton
              to={item.link}
              sx={{ textAlign: 'center' }}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
    <div sx={{ backgroundColor: '#F8BBD0' }} >
      <Box   sx={{ display: 'flex' }}>
      <CssBaseline   />
      <AppBar component="nav" sx={{ backgroundColor: '#c9d8d842' }}  >
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Course Seller
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <div style={{ display: 'flex' }}>


              {navItems.map((item) => (
                <ListItemButton key={item.k}
                  to={item.link}
                  sx={{ textAlign: 'center' }}
                >
                  <ListItemText primary={item.text} />
                </ListItemButton>
              ))}
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,backgroundColor: '#c9d8d842' },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
    </div>
    </>
  );
}

ForallAppBar.propTypes = {

  window: PropTypes.func,
};

function AdminAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleAllCoursesClick = () => {
    window.location.assign('/all');
  };
  const handlemycourses=()=>{
    window.location.assign('/mycourses');
  }
  const handlenewcourse=()=>{
    window.location.assign('/newcourse');
  }
  return (
    <AppBar position="static" sx={{ backgroundColor: '#c9d8d842' }} >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },              
              fontWeight: 700,            
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Course Seller
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleAllCoursesClick} >
                <Typography textAlign="center">All Courses</Typography>
              </MenuItem>
              <MenuItem onClick={handlemycourses}>
                <Typography textAlign="center">My Courses</Typography>
              </MenuItem>
              <MenuItem onClick={handlenewcourse}>
                <Typography textAlign="center">Create New</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Course Seller
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            <Button onClick={handleAllCoursesClick}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              All Courses
            </Button>
            <Button onClick={handlemycourses}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              My Courses
            </Button>
            <Button    onClick={handlenewcourse}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Create New 
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem >
                <a href='/login' style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => { localStorage.setItem('token', null); console.log("i am clicked") }} >
                  <Typography textAlign="center">Logout</Typography>
                </a>
              </MenuItem>

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

