# TaskDuty — Backend API

TaskDuty is a personal task management backend API built as part of the TechStudio Internship Stage 2 backend assignment.

The project focuses on authentication, authorization, user-scoped task data, CRUD operations, and task filtering.

## Features

- User registration
- User login
- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- User-scoped task data
- Create tasks
- View tasks
- Update tasks
- Delete tasks
- Filter tasks by category
- Filter tasks by completion status
- Combine multiple filters
- Authorization checks to prevent users from accessing or modifying other users' tasks
- Search tasks by title and description

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- Postman

## Project Structure

```text
task-duty/
├── client/
│   └── React frontend from Stage 1
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authControllers.js
│   │   └── taskControllers.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── README.md
```
