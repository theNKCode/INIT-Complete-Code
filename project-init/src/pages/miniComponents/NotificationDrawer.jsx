import React from 'react';
import { Drawer, IconButton, List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import { Notifications, Close } from '@mui/icons-material';

const NotificationDrawer = ({ open, onClose }) => {
  // Sample data for notifications and messages
  const notifications = [
    { id: 1, title: 'New Policy', description: 'You have a new insurance policy available.' },
    { id: 2, title: 'Policy Update', description: 'Your policy has been updated.' },
  ];

  const messages = [
    { id: 1, sender: 'John Doe', preview: 'Hey, I wanted to check in on...' },
    { id: 2, sender: 'Jane Smith', preview: 'Don’t forget about our meeting tomorrow.' },
  ];

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 250, padding: 2 }} role="presentation">
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 10, right: 10 }}>
          <Close />
        </IconButton>
        <Typography variant="h6" sx={{ padding: 2 }}>
          Notifications
        </Typography>
        <List>
          {notifications.length ? (
            notifications.map((notification) => (
              <ListItem key={notification.id}>
                <ListItemText
                  primary={notification.title}
                  secondary={notification.description}
                />
              </ListItem>
            ))
          ) : (
            <Typography>No notifications available</Typography>
          )}
        </List>

       
      </Box>
    </Drawer>
  );
};

export default NotificationDrawer;
