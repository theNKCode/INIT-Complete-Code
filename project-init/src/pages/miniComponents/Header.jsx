import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Notifications, Menu as MenuIcon, AccountCircle } from '@mui/icons-material';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const notifications = [
    { title: 'New Insurance', description: 'Click here for details.', date: '23.11.2020', url: 'https://www.example.com' },
    // Add more notifications
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            INIT
          </Typography>
          <IconButton color="inherit" onClick={handleDrawerOpen}>
            <Badge badgeContent={notifications.length} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={handleMenuClick}>
            <AccountCircle />
          </IconButton>
          {/* Add menu items if needed */}
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        <List>
          {notifications.map((notification, index) => (
            <ListItem button key={index} onClick={() => window.location.href = notification.url}>
              <ListItemText
                primary={notification.title}
                secondary={notification.description}
              />
              <span>{notification.date}</span>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
