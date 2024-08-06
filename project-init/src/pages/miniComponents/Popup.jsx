import React from 'react';
import './styles/Popup.css';
import { IconButton } from '@mui/material'; // Updated import
import FlagIcon from '@mui/icons-material/Flag'; // Updated import
import BookmarkIcon from '@mui/icons-material/Bookmark'; // Updated import
import CancelIcon from '@mui/icons-material/Cancel'; // Updated import
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'; // Updated import
import VisibilityIcon from '@mui/icons-material/Visibility'; // Updated import

const Popup = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className='popup' onClick={onClose}>
      <div className='popup__option'>
        <div className='popup__left'>
          <BookmarkIcon style={{ color: 'gray' }} />
        </div>
        <div className='popup__right'>
          <h1 style={{ fontSize: 13, fontWeight: 400 }}>Save</h1>
          <h1 style={{ fontSize: 11, fontWeight: 200 }}>Save for later</h1>
        </div>
      </div>

      <div className='popup__option'>
        <div className='popup__left'>
          <CancelIcon style={{ color: 'gray' }} />
        </div>
        <div className='popup__right'>
          <h1 style={{ fontSize: 13, fontWeight: 400 }}>Unfollow</h1>
          <h1 style={{ fontSize: 11, fontWeight: 200 }}>Stay connected</h1>
        </div>
      </div>

      <div className='popup__option'>
        <div className='popup__left'>
          <VisibilityOffIcon style={{ color: 'gray' }} />
        </div>
        <div className='popup__right'>
          <h1 style={{ fontSize: 13, fontWeight: 400 }}>I don't want to see this</h1>
          <h1 style={{ fontSize: 11, fontWeight: 200 }}>Let us know</h1>
        </div>
      </div>

      <div className='popup__option'>
        <div className='popup__left'>
          <FlagIcon style={{ color: 'gray' }} />
        </div>
        <div className='popup__right'>
          <h1 style={{ fontSize: 13, fontWeight: 400 }}>Report this post</h1>
          <h1 style={{ fontSize: 11, fontWeight: 200 }}>This post is offensive</h1>
        </div>
      </div>

      <div className='popup__option'>
        <div className='popup__left'>
          <VisibilityIcon style={{ color: 'gray' }} />
        </div>
        <div className='popup__right'>
          <h1 style={{ fontSize: 13, fontWeight: 400 }}>Who can see this post?</h1>
          <h1 style={{ fontSize: 11, fontWeight: 200 }}>Visible to anyone on</h1>
        </div>
      </div>
    </div>
  );
};

export default Popup;
