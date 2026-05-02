import prisma from "../db/prisma.js";

export async function listCourses(req, res, next) {
  try {
    const user = req.user;
    const enrollmentFilter = user?.role === "STUDENT"
      ? {
          enrollments: {
            none: {
              userId: user.id
            }
          }
        }
      : {};
    const courses = await prisma.course.findMany({
      where: enrollmentFilter,
      orderBy: { createdAt: "desc" }
    });
    res.json(courses);
  } catch (error) {
    next(error);
  }
}

export async function getCourseById(req, res, next) {
  try {
    const courseId = Number(req.params.id);
    const course = await prisma.course.findUnique({
      where: { id: courseId }
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.json(course);
  } catch (error) {
    return next(error);
  }
}

export async function createCourse(req, res, next) {
  try {
    const { title, description, price, thumbnail } = req.body;

    if (!title || !description || price === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        price: Number(price),
        thumbnail: thumbnail || null
      }
    });

    return res.status(201).json(course);
  } catch (error) {
    return next(error);
  }
}
