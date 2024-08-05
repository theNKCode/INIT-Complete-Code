import express from "express";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import {createPost, getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

/* READ */
router.get("/",isAuthenticated, isAuthenticated, isAuthenticated, isAuthorized('Job Seeker','Employer', 'admin'), catchAsyncErrors(getFeedPosts));
router.get("/:userId/posts", isAuthenticated, isAuthenticated, isAuthorized('Job Seeker','Employer', 'admin'), catchAsyncErrors(getUserPosts));


/* UPDATE */
router.patch("/:id/like", isAuthenticated, isAuthenticated, isAuthorized('Job Seeker','Employer', 'admin'), catchAsyncErrors(likePost));

export default router;