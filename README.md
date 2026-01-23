# 🚀 Full Stack Open - University of Helsinki

Welcome to my comprehensive journey through the **Full Stack Open** course by the University of Helsinki. This repository serves as a deep dive into modern JavaScript-based web development, covering everything from the basics of React to advanced concepts like GraphQL and CI/CD.

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
  <img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white" />
</p>

## 📑 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Curriculum Journey](#-curriculum-journey)
- [Projects Highlights](#-projects-highlights)
- [How to Run](#-how-to-run)
- [Certification](#-certification)

---

## 🌟 Overview

The **Full Stack Open** course is an intensive program focused on building modern web applications. The main emphasis is on single-page applications (SPA) built with **React** and supported by REST or GraphQL APIs built with **Node.js**.

Throughout this course, I have implemented dozens of features, focusing on:
- Functional React and Hooks
- Server-side development with Express
- Database management with MongoDB
- Robust testing (Unit, Integration, and E2E)
- State management (Redux, React Query, Context API)
- Modern tooling (Vite, Webpack, ESLint, Prettier)

---

## 🛠 Tech Stack

### Frontend
- **Framework:** React 18+
- **State Management:** Redux, Redux Toolkit, React Query (TanStack), Context API
- **Styling:** CSS Modules, Styled Components, Material UI, Bootstrap
- **Testing:** Jest, Vitest, React Testing Library, Cypress

### Backend
- **Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens), Bcrypt
- **API:** RESTful APIs, GraphQL (Apollo Server)

### Tooling & DevOps
- **Languages:** JavaScript (ES6+), TypeScript
- **Tools:** Git, Docker, Webpack, Babel, ESLint, Prettier
- **CI/CD:** GitHub Actions

---

## 🛤 Curriculum Journey

### [Part 0: Fundamentals of Web Apps](./Part0/)
Understanding the basics of HTTP, HTML, CSS, and how data flows in a web application.
- *Key Concepts:* HTTP requests, Document Object Model (DOM), Single Page Application (SPA) architecture.

### [Part 1: Introduction to React](./Part1/)
Diving into component-based architecture and state management.
- **Projects:** [Course Info](./Part1/courseinfo/), [Unicafe](./Part1/unicafe/), [Anecdotes](./Part1/anecdotes/)

### [Part 2: Communicating with Server](./Part2/)
Managing data persistence and fetching data from external APIs.
- **Projects:** [Phonebook](./Part2/phonebook/), [Data for Countries](./Part2/datacountries/)

### [Part 3: Programming a Server with NodeJS and Express](./Part3/)
Building the backend! Creating RESTful APIs and connecting them to a MongoDB database.
- *Key Concepts:* Express routing, Middleware, Mongoose, Deployment.

### [Part 4: Testing Express Servers, User Administration](./Part4/)
Focusing on code quality and security.
- **Projects:** [Blog List Backend](./Part4/bloglist/)
- *Key Concepts:* Jest testing, JWT Authentication, Async/Await.

### [Part 5: Testing React Apps](./Part5/)
Ensuring the frontend is reliable and bug-free.
- **Projects:** [Blog List Frontend](./Part5/bloglist-frontend/)
- *Key Concepts:* Integration testing, E2E testing with Cypress.

### [Part 6: Advanced State Management](./Part6/)
Transitioning from local state to complex global state management.
- **Projects:** [Redux Anecdotes](./Part6/redux-anecdotes/), [Unicafe Redux](./Part6/unicafe-redux/)

### [Part 7: React Router, Custom Hooks, Styling App with CSS and Webpack](./Part7/)
Polishing the user experience and optimizing the build process.
- **Projects:** [Blog List Extended](./Part7/bloglist-extend/), [Country Hook](./Part7/country-hook/), [Ultimate Hooks](./Part7/ultimate-hooks/)

### [Part 8: GraphQL](./Part8/)
Modern data fetching and schema-based APIs.
- **Projects:** [Library Backend](./Part8/library-backend/), [Library Frontend](./Part8/library-frontend/)

---

## ✨ Projects Highlights

### 📞 The Phonebook (Part 2 & 3)
A full-stack application for managing contacts.
- Features real-time search filtering.
- Backend validation with Mongoose.
- Success and error notifications.

### 📝 Blog List (Part 4, 5, & 7)
A comprehensive blog management system.
- User authentication and authorization.
- Like and delete functionality.
- Extensive test coverage (Unit, Integration, and E2E).
- Modern UI using Redux and CSS frameworks.

### 📚 Library (Part 8)
A GraphQL-powered application for tracking books and authors.
- Complex data relations.
- Subscription support for real-time updates.

---

## 🚀 How to Run

Each project is self-contained within its respective directory. To run a project:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/fullstackopen.git
   cd fullstackopen
   ```

2. **Navigate to the project directory:**
   ```bash
   cd Part4/bloglist
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Set up Environment Variables:**
   Create a `.env` file (if applicable) and add necessary credentials (e.g., `MONGODB_URI`, `SECRET`).

5. **Run the development server:**
   ```bash
   npm run dev  # For backend
   # OR
   npm start    # For frontend
   ```

---

## 📜 Certification

Completed with ❤️ by **Tomi Lahti**.
This repository is a testament to my dedication to learning and mastering modern web development.

---

> "The best way to learn to code is to code." 💻

[Visit Full Stack Open](https://fullstackopen.com/)
