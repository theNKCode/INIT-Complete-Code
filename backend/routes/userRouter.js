import express from "express";
import { approveUser, getUser, login, logout, register, updatePassword, updateProfile, getAllUsers } from "../controllers/userController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/admin/approve", isAuthenticated, isAuthorized('admin'), approveUser); // Admin only approval route
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);
router.put("/update/profile", isAuthenticated, updateProfile);
router.put("/update/password", isAuthenticated, updatePassword);

// Route to get all users, admin only
router.get("/admin/users", isAuthenticated, isAuthorized('admin'), getAllUsers);

export default router;
