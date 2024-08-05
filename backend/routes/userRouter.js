import express from "express";
import { approveUser, getUser, getUserCompanies, addRemoveCompany, login, logout, register, updatePassword, updateProfile } from "../controllers/userController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const router = express.Router();


// Route to get all users, admin only
// router.get("/admin/users", isAuthenticated, isAuthorized('admin'), getAllUsers);
////////////////////////////////
// router.get("/:id", isAuthenticated, getUser);
// router.get("/:id/companys", verifyToken, getUserCompanies);
// router.patch("/:id/:companyId", verifyToken, addRemoveCompany);

router.post("/register", register);
router.post("/login", login);
router.post("/admin/approve", isAuthenticated, isAuthorized('admin'), approveUser); // Admin only approval route
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser); // Same as /:id
router.put("/update/profile", isAuthenticated, isAuthorized('Job Seeker','Employer' ,'admin'), updateProfile);
router.put("/update/password", isAuthenticated, isAuthorized('Job Seeker','Employer' ,'admin'), updatePassword);


///////////////////////////////////////////
router.get("/:id", isAuthenticated, isAuthorized('Job Seeker','Employer' ,'admin'), getUser);
router.get("/:id/companies", isAuthenticated, isAuthorized('Job Seeker','Employer' ,'admin'), getUserCompanies);
router.patch("/:id/:companyId",isAuthenticated, isAuthorized('Job Seeker','Employer', 'admin'), addRemoveCompany);



// router.post("/register", register);
// router.post("/login", login);
// router.post("/logout", isAuthenticated, logout);
// router.get("/getuser/:id", isAuthenticated, getUser);
// router.put("/update/profile/:id", isAuthenticated, updateProfile);
// router.put("/update/password/:id", isAuthenticated, updatePassword);
// router.post("/admin/approve", isAuthenticated, isAuthorized("admin"), approveUser);
// router.get("/companies/:id", isAuthenticated, getUserCompanies);


export default router;
