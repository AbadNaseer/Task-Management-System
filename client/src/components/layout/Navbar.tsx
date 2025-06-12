import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  AccountCircle,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const token = localStorage.getItem('token');

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <IconButton
            component={RouterLink}
            to="/"
            sx={{ color: 'white', marginRight: 2 }}
          >
            <AssignmentIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>

          {token ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                color="inherit"
                component={RouterLink}
                to="/dashboard"
                sx={{ marginRight: 2 }}
              >
                Dashboard
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/tasks"
                sx={{ marginRight: 2 }}
              >
                Tasks
              </Button>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/register">
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 