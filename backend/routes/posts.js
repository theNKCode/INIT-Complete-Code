import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

/* READ */
router.get("/",isAuthenticated, isAuthenticated, isAuthenticated, isAuthorized('Job Seeker','Employer', 'admin'), getFeedPosts);
router.get("/:userId/posts", isAuthenticated, isAuthenticated, isAuthorized('Job Seeker','Employer', 'admin'), getUserPosts);


/* UPDATE */
router.patch("/:id/like", isAuthenticated, isAuthenticated, isAuthorized('Job Seeker','Employer', 'admin'), likePost);

export default router;