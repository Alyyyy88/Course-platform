Mini Course Platform (React + Node + Postgres)

Structure
- client: Vite + React + Tailwind + TanStack Query
- server: Express + Prisma + PostgreSQL

Server setup
1) cd server
2) npm install
3) Create a .env file using .env.example and set DATABASE_URL + JWT_SECRET
4) npm run prisma:migrate
5) npm run prisma:seed
6) npm run dev

Client setup
1) cd client
2) npm install
3) npm run dev

Notes
- Admin-only course creation is at /admin/courses.
- Seeded credentials (password: password123):
	- admin@trailhead.dev (ADMIN)
	- student@trailhead.dev (STUDENT)
