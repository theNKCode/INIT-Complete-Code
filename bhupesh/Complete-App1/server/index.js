// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import multer from 'multer';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import authRouter from './routes/auth.js';
// import userRouter from './routes/users.js';
// import postRouter from './routes/posts.js';
// import { register } from './controllers/auth.js';
// import { createPost } from './controllers/posts.js';
// import { verifyToken } from './middleware/auth.js';
// import User from './models/User.js';
// import Post from './models/Post.js';
// import {users, posts } from './data/index.js';
// import cloudinary from 'cloudinary';


// /* CONFIGURATION */
// const __filename = fileURLToPath(import.meta.url); //Grab Kar fileurl and convert to path
// const __dirname = path.dirname(__filename);
// dotenv.config();
// const app = express(); 
// //Alter karacha Asel tr Github check kara sagdaychi
// app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); //Allow kela cross-origin reqests
// app.use(morgan('common'));
// app.use(bodyParser.json({ limit: "30mb", extended: true })); 
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); //
// app.use(cors()); // To invoke cross-origin requests
// app.use('/assets', express.static(path.join(__dirname, 'public/assets'))); // To serve static files /Set the directory to set assets

// /* FILE STORAGE */
// // He configuration multer cha repo madhe available aahe
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/assets');
//     },//Destination of file
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// });

// const upload = multer({ storage: storage });


// /* ROUTES WITH FILES */ 
// app.post('/auth/register', upload.single('picture'), register); //Middleware to upload file //register is a controller or logic of endpoint
// app.post('/posts',verifyToken, upload.single('picture'), createPost); //Middleware to upload file //register is a controller or logic of endpoint

// /* ROUTES */
// app.use('/auth', authRouter);
// app.use ('/users', userRouter);
// app.use ('/posts', postRouter);


// console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
// console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
// console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET);
// console.log('PORT:', process.env.PORT);

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// /* MONGOOSE Setup */
// const PORT = process.env.PORT || 3001; //Backup Port 6001
// mongoose.connect(process.env.MONGO_URL,
    
// )
//     .then(() => {
//         app.listen(PORT, () => {
//             console.log(`Server is running on PORT ${PORT}`);
//         });

//     })
//     .catch((error) => {
//         console.log(`${error} occurred, did not connect`);
//     });





import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import cloudinary from './config/cloudinary.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/users.js';
import postRouter from './routes/posts.js';
import { register } from './controllers/auth.js';
import { createPost } from './controllers/posts.js';
import { updateUserPhoto } from './controllers/users.js';
import { verifyToken } from './middleware/auth.js';

/* CONFIGURATION */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save to uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post('/auth/register', upload.single('picture'), register);
app.post('/posts', verifyToken, upload.single('picture'), createPost);
app.post('/users/:id/photo', verifyToken, upload.single('photo'), updateUserPhoto);

/* ROUTES */
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(`${error} occurred, did not connect`);
    });
