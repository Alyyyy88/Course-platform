import prisma from "../db/prisma.js";

export async function getUserEnrollments(req, res, next) {
  try {
    const userId = Number(req.params.id);
    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: { course: true },
      orderBy: { createdAt: "desc" }
    });

    res.json(enrollments);
  } catch (error) {
    next(error);
  }
}

export async function getMyEnrollments(req, res, next) {
  try {
    const userId = req.user?.id;
    const enrollments = await prisma.enrollment.findMany({
      where: { userId },
      include: { course: true },
      orderBy: { createdAt: "desc" }
    });

    res.json(enrollments);
  } catch (error) {
    next(error);
  }
}
