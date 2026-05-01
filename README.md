# 🧩 Issue Tracker App

A full-stack Issue Tracker application built with modern web technologies.  
This project demonstrates authentication, CRUD operations, state management, and scalable frontend architecture using Next.js.

---

## 🚀 Features

- 🔐 Authentication with NextAuth (Google OAuth)
- 📝 Create, edit, delete, and view issues
- 👤 Assign issues to users
- 📊 Issue status management (Open, In Progress, Closed)
- ⚡ Optimized data fetching with React Query
- 🧠 Server-side and client-side state handling
- 🎯 Protected routes using middleware and session validation
- 🎨 Clean UI using Radix UI + Tailwind CSS
- ⏳ Skeleton loaders for improved UX
- 🔄 Real-time UI updates after mutations

---

## 🧱 Tech Stack

### Frontend

- React
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Radix UI

### Backend

- Next.js API Routes
- Prisma ORM
- MySQL (TiDB Cloud)

### Authentication

- NextAuth (Auth.js)
- Google OAuth provider

### Data Fetching & State Management

- React Query (TanStack Query)

### Validation

- Zod

### UX Enhancements

- Skeleton loaders
- Loading states
- Error handling dialogs
- Artificial delay for testing UI states

---

## 🗄️ Database

This project uses **MySQL hosted on TiDB Cloud**, a fully managed, serverless database platform compatible with MySQL.

TiDB Cloud provides:

- High availability
- Scalability
- Managed infrastructure (no manual setup required)

Prisma is used as the ORM to interact with the database.

---

## 📦 Key Libraries & Services

- [Next.js](https://nextjs.org/)
- [React Query](https://tanstack.com/query)
- [Prisma](https://www.prisma.io/)
- [NextAuth](https://next-auth.js.org/)
- [Radix UI](https://www.radix-ui.com/themes/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/)
- [Axios](https://axios-http.com/)
- [TiDB Cloud](https://tidbcloud.com/)

---

## 🧠 Architecture Highlights

### 🔹 Separation of Concerns

- Pages focus on layout and composition
- Components handle UI logic
- API routes handle database operations

### 🔹 Server vs Client Responsibilities

| Layer  | Responsibility                      |
| ------ | ----------------------------------- |
| Client | UI interactions, API calls          |
| Server | Database operations, authentication |
| Prisma | Data access layer                   |

### 🔹 Database Layer

- Prisma acts as the abstraction layer between the application and the database
- TiDB Cloud provides a scalable MySQL-compatible backend

---

## 🔐 Authentication Flow

- NextAuth handles OAuth login (Google)
- Session is managed using JWT strategy
- `SessionProvider` enables client-side session access
- `getServerSession` is used for server-side protection
- Middleware restricts access to protected routes

---

## 🔄 Data Fetching Strategy

### Before

- `useState` + `useEffect`
- Manual loading & error handling

### After (React Query)

- Automatic caching
- Built-in loading & error states
- Refetch on demand

### Important Config

```ts
staleTime: 60_000;
retry: 3;
```

- staleTime → avoids unnecessary API calls
- retry → improves resilience to network issues

---

## 🔁 Mutations & Cache Sync

After create/update/delete:

```ts
queryClient.invalidateQueries(['issues']);
```

This ensures:

- UI stays in sync with backend
- No stale data is displayed

---

## 🧩 UI Patterns

### 🔹 Radix UI Components

- AlertDialog (delete confirmation)
- DropdownMenu (user actions)
- Select (assign users)

### 🔹 Controlled vs Uncontrolled Inputs

- `defaultValue` → initial value of the select input
- `onValueChange` → updates backend when user changes selection

---

## 🧪 Error Handling

- API returns proper HTTP status codes:
  - 400 → invalid request
  - 401 → unauthorized
  - 404 → not found
  - 500 → server error
- UI shows error dialogs using Radix components

---

## 🎯 Middleware Protection

```ts
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/issues/new', '/issues/:id+/edit'],
};
```

Prevents unauthorized users from accessing protected pages.

---

## ⏳ Loading Experience

- Skeleton loaders used for forms and pages
- Improves perceived performance
- Artificial delay used to simulate loading states during development

---

## 📁 Project Structure

```md
app/
├ api/
├ issues/
│ ├ \_components/
│ ├ new/
│ └ [id]/
├ components/
├ prisma/
└ auth/
```

---

## 🌐 Deployment

- Frontend: [Vercel](https://issue-tracker-three-bay.vercel.app)
- Database: TiDB Cloud
