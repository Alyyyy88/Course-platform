import { Router } from "express";
import authRoutes from "./auth.js";
import courseRoutes from "./courses.js";
import enrollmentRoutes from "./enrollments.js";
import userRoutes from "./users.js";

const router = Router();

router.use("/courses", courseRoutes);
router.use("/enrollments", enrollmentRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;
