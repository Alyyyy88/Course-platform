import { Router } from "express";
import {
  createCourse,
  getCourseById,
  listCourses
} from "../controllers/courseController.js";
import {
  authenticateOptional,
  requireAdmin,
  requireAuth
} from "../middleware/auth.js";

const router = Router();

router.get("/", authenticateOptional, listCourses);
router.get("/:id", getCourseById);
router.post("/", requireAuth, requireAdmin, createCourse);

export default router;
