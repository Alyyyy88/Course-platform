import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function findOrCreateCourse(courseData) {
  const existing = await prisma.course.findFirst({
    where: { title: courseData.title }
  });

  if (existing) {
    return existing;
  }

  return prisma.course.create({ data: courseData });
}

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);
  const student = await prisma.user.upsert({
    where: { email: "student@trailhead.dev" },
    update: {
      passwordHash
    },
    create: {
      name: "Demo Student",
      email: "student@trailhead.dev",
      role: UserRole.STUDENT,
      passwordHash
    }
  });

  await prisma.user.upsert({
    where: { email: "admin@trailhead.dev" },
    update: {
      passwordHash
    },
    create: {
      name: "Platform Admin",
      email: "admin@trailhead.dev",
      role: UserRole.ADMIN,
      passwordHash
    }
  });

  const courses = await Promise.all([
    findOrCreateCourse({
      title: "Product Strategy Sprints",
      description:
        "Craft clear roadmaps, prioritize experiments, and translate research into strategic action.",
      price: 189,
      thumbnail:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
    }),
    findOrCreateCourse({
      title: "Design Ops Toolkit",
      description:
        "Scale design systems, build cross-functional rituals, and measure product impact.",
      price: 149,
      thumbnail:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80"
    }),
    findOrCreateCourse({
      title: "Growth Analytics Foundations",
      description:
        "Understand funnels, attribution, and cohort analysis with hands-on dashboards.",
      price: 129,
      thumbnail:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80"
    })
  ]);

  await prisma.enrollment.upsert({
    where: {
      userId_courseId: {
        userId: student.id,
        courseId: courses[0].id
      }
    },
    update: {},
    create: {
      userId: student.id,
      courseId: courses[0].id
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
