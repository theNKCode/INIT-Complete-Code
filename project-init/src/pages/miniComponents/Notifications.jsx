import React, { useState } from 'react';
import './styles/Notifications.css';
import NotificationFeed from './NotificationFeed';
import NotificationDrawer from './NotificationDrawer';

const Notifications = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <div className='notifications'>
      <div className='notification__sidebar'>
        <div className='notificationSidebar__top'>
          <h1 className='sidebar__title'>Notifications</h1>
          <p className='sidebar__text'>You’re all caught up! Check</p>
          <p className='sidebar__text'>back later for new notifications</p>
        </div>
        <div className='notificationSidebar__bottom'>
          <p className='sidebar__text'>Improve your notifications</p>
          <h1 className='sidebar__settings'>View settings</h1>
        </div>
      </div>
      <div className='notification__feed'>
        {[...Array(24)].map((_, index) => (
          <NotificationFeed key={index} />
        ))}
      </div>
      <div className='notification__widgets'>
        <div className='notificationWidget__container'>
          <img
            className='notificationWidget__image'
            src='https://static-exp1.licdn.com/scds/common/u/images/promo/ads/li_evergreen_jobs_ad_300x250_v1.jpg'
            alt='Promotional'
          />
        </div>
      </div>

      {/* Add NotificationDrawer here */}
      <NotificationDrawer open={drawerOpen} onClose={toggleDrawer} />
    </div>
  );
};

export default Notifications;
