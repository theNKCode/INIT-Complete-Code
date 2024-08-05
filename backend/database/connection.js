import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/userSchema.js';
import Post from '../models/Post.js';
import { users, posts } from '../data/index.js';
dotenv.config();

export const connection = () => {
  const PORT = process.env.PORT || 6001;
  mongoose.connect(process.env.MONGO_URI, {
    dbName: 'INIT-PROJECT',
  })
  .then(() => {
    console.log('Connected to database.');
    // User.insertMany(users);
    // Post.insertMany(posts);
    // console.log('Data imported.');
  })
  .catch((err) => {
    console.log(`Some error occurred while connecting to database: ${err}`);
  });
};
