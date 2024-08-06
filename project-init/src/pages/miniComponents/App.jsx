import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import NotificationDrawer from './NotificationDrawer'; // Adjust the path if necessary

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <>
      <IconButton onClick={toggleDrawer}>
        <NotificationsIcon />
      </IconButton>
      <NotificationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default App;
