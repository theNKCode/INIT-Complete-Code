// NotificationFeed.jsx
import React, { useState } from 'react';
import './styles/NotificationFeed.css';
import { Avatar, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import NotificationDrawer from './NotificationDrawer'; // Import the NotificationDrawer component

const NotificationFeed = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Toggle the drawer
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <div className="notificationFeed">
      <div className="notificationFeed__left">
        <Avatar style={{ cursor: 'pointer' }} />
      </div>
      <div className="notificationFeed__middle">
        <p style={{ cursor: 'pointer' }}>
          Congratulate Shuhanur Rahman for starting a new position as Junior Quality Control Engineer at United Surgical...
        </p>
        <button>View event</button>
      </div>
      <div className="notificationFeed__right">
        <h1>3h</h1>
        <IconButton onClick={toggleDrawer}>
        <MoreHorizIcon />
        </IconButton>
      </div>
      {/* Render the NotificationDrawer component */}
      <NotificationDrawer open={drawerOpen} onClose={toggleDrawer} />
    </div>
  );
};

export default NotificationFeed;
