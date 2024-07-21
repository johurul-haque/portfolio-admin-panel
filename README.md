## Getting Started
Add the environment variables. There will be a `.env.example` file for guidance.

```bash
pnpm i:dep
```
This is a custom script. Run at the **root** of the project. This will install all of the dependencies at the root, then `cd` into the client directory and install all of its dependencies too.

```bash
pnpm db:migrate # run at the root 
```

This will generate and push your schema migrations to the databases. 

```bash
pnpm db:seed # run at the root
```
This will create a new user with the provided username and password from the environment variables.

### dev server

To start the dev server, both the frontend and the backend application needs to run in parallel.

At root run `pnpm dev` to start hono. Open a new terminal session, `cd` into the client directory and run `pnpm dev` again to start the react application.

### production build
`cd` into the client directory and run `pnpm build` to build the react application. This will generate a dist folder containing the static assets which then be served by the hono.

## Technologies
### Frontend
- React with Vite
- Tanstack Router - For client-side navigation and implementing protected routes
- Tanstack Query - For data fetching, mutations, and invalidating queries.
- React Hook Form - Handling form submission and validation.
- Novel - Rich text editor for creating blog.
- Typescript, TailwindCSS, and shadcn/ui

### Backend
- Hono - For its simplicity and efficiency.
- Drizzle ORM - Better choice than Prisma
- PostgreSQL hosted on Supabase
- Zod
- TypeScript (Of course🔥)

## App structure
```bash
- client # React application using Vite
- server # Hono server using NodeJs
... # Other files
```