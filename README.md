# Task-Management-System
This Task Management System is a Node.js application designed to help users manage their daily tasks efficiently. Users can create, categorize, and prioritize their tasks while also marking them as completed once done.

## Features

- **Task Creation:** Users can create tasks with a title, description, and due date.
- **Task Categorization:** Each task can be assigned to different categories such as Work, Personal, or Errands.
- **Task Prioritization:** Users can prioritize tasks as High, Medium, or Low.
- **Task Completion:** Tasks can be marked as completed.
- **View Tasks:** Users can view their tasks sorted by due date, category, or completion status.
- **User Authentication:** Secure user registration and authentication to manage tasks.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone [repository_url]
   cd task_manager
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   - Rename `.env.example` to `.env`
   - Replace the placeholder values with your own MongoDB URI and JWT secret.

4. Start the server:
   ```bash
   npm start
   ```

## Usage

After starting the server, you can use the application via any API client like Postman or through frontend integration.

**Endpoints:**

- POST `/api/user/register` - Register a new user
- POST `/api/user/login` - Login as an existing user
- GET `/api/tasks` - Retrieve all tasks for the logged-in user
- POST `/api/tasks` - Create a new task
- PATCH `/api/tasks/:taskId` - Update an existing task
- DELETE `/api/tasks/:taskId` - Delete a task

Replace `:taskId` with the actual ID of the task you want to modify or delete.

## Running Tests

To run the automated tests for the application:

```bash
npm test
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
