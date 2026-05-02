import { Router } from "express";
import { createEnrollment } from "../controllers/enrollmentController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", requireAuth, createEnrollment);

export default router;
