# Student Management API

A RESTful Student Management API built with **Node.js** and **Express.js**. This project allows users to manage student records through CRUD operations, search and filtering, and student statistics.

## Features

- Retrieve all students.
- Retrieve a student by ID.
- Create new student records.
- Update complete student records using PUT.
- Partially update student records using PATCH.
- Delete student records.
- Search students by name, email, course, status, and GPA.
- View student statistics, including total students, average GPA, and students by course.
- Validate incoming student data.
- Validate student IDs.
- Log incoming HTTP requests.
- Handle application errors using centralized error-handling middleware.

## Technologies Used

- Node.js
- Express.js
- JavaScript (ES Modules)
- Postman

## Project Structure

```text
student-management-api/
│
├── controllers/
│   └── studentController.js
│
├── data/
│   └── students.js
│
├── middleware/
│   ├── errorHandler.js
│   ├── logger.js
│   └── validateStudent.js
│
├── routes/
│   └── students.js
│
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate into the project

```bash
cd student-management-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The server runs at:

```text
http://localhost:3000
```

## API Endpoints

Base URL: `http://localhost:3000/api/students`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get all students |
| GET | `/:id` | Get student by ID |
| POST | `/` | Create a student |
| PUT | `/:id` | Fully update a student |
| PATCH | `/:id` | Partially update a student |
| DELETE | `/:id` | Delete a student |
| GET | `/search` | Search and filter students |
| GET | `/stats` | Get student statistics |

## Student Data Format

```json
{
  "name": "Neima Alemu",
  "email": "neima@example.com",
  "age": 22,
  "course": "Software Engineering",
  "gpa": 3.8,
  "status": "Active"
}
```

## Search Examples

Search by name:

```text
GET /api/students/search?name=Amina
```

Search by course:

```text
GET /api/students/search?course=Computer Science
```

Search by status:

```text
GET /api/students/search?status=Active
```

Search by GPA:

```text
GET /api/students/search?gpa=3.7
```

Multiple filters can also be combined.

## Validation Rules

- All student fields are required when creating or fully updating a student.
- Name and course must be non-empty strings.
- Email must have a valid email format.
- Age must be a positive number.
- GPA must be between 0 and 4.
- Status must be either Active or Inactive.
- PATCH only updates the fields provided.
- Invalid fields are rejected.

## Error Handling

The API uses appropriate HTTP status codes:

| Status Code | Meaning |
|---|---|
| 200 | Successful request |
| 201 | Resource created |
| 400 | Invalid request or validation error |
| 404 | Student not found |
| 500 | Internal server error |

## Data Storage

This project currently uses an in-memory JavaScript array to store student records.

This means data changes are not permanent and will reset when the server restarts.

## Testing

API endpoints were tested using **Postman**, including:

- CRUD operations.
- Search and filtering.
- Student statistics.
- Input validation.
- Invalid student IDs.
- Error handling.

## Author

**Neima Alemu**

Software Engineering Student

## License

This project is licensed under the ISC License.