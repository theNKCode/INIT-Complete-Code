import express from "express";
import {
  getUser,
  getUserCompanies,
  addRemoveCompany,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/companys", verifyToken, getUserCompanies);

/* UPDATE */
router.patch("/:id/:companyId", verifyToken, addRemoveCompany);

export default router;