import prisma from "../db/prisma.js";

export async function createEnrollment(req, res, next) {
  try {
    const { courseId } = req.body;
    const userId = req.user?.id;

    if (!userId || !courseId) {
      return res.status(400).json({ message: "courseId required" });
    }

    const existing = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: Number(userId),
          courseId: Number(courseId)
        }
      }
    });

    if (existing) {
      return res.status(200).json(existing);
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        user: { connect: { id: Number(userId) } },
        course: { connect: { id: Number(courseId) } }
      }
    });

    return res.status(201).json(enrollment);
  } catch (error) {
    return next(error);
  }
}
