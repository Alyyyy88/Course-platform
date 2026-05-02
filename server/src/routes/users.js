import { Router } from "express";
import {
	getMyEnrollments,
	getUserEnrollments
} from "../controllers/userController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/me/enrollments", requireAuth, getMyEnrollments);
router.get("/:id/enrollments", getUserEnrollments);

export default router;
