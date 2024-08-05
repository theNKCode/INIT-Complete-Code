import express from "express";
import cors from "cors";
import helmet from 'helmet';
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import { newsLetterCron } from "./automation/newsLetterCron.js";

import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import multer from 'multer';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import express from "express";
import cors from "cors";
import helmet from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cookieParser from "cookie-parser";
import appError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import { sendEmail } from "./utils/sendEmail.js";

const app = express();
config({ path: "./config/config.env" });

app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL, process.env.STUDENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);


app.use(helmet());
app.use(xss());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: true,
}));
app.use(hpp());
app.use(mongoSanitize());
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

/* CONFIGURATION */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
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

//////////////////////////////////////////////////
/* ROUTES WITH FILES */
// app.post('/auth/register', upload.single('picture'), register);
app.post('/posts', verifyToken, upload.single('picture'), createPost);
app.post('/api/v1/user/:id/photo', verifyToken, upload.single('photo'), updateUserPhoto);

//////////////////////////////////////////////////

app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

app.all("*", (req, res, next) => {
  next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

newsLetterCron()
connection();
app.use(errorMiddleware);



export default app;
