This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## About

This project uses Next.js, TypeScript.

For the backend it uses MongoDB with Mongoose, Bcrypt, and JWT authentication with cookie.
A Swagger API documentation is available at `/api/docs`.

For the UI, it uses the [Tailwind CSS](https://tailwindcss.com/) utility-first CSS framework with [shadcn/ui](https://ui.shadcn.com)
For the form validation, it uses [React Hook Form](https://react-hook-form.com/) with [zod](https://zod.dev) for schema validation
For the query, it uses [React Query](https://react-query.tanstack.com/)

Tested with Jest and React Testing Library

## Features

- Light/Dark mode
- Multilanguage (en, fr)
- Responsive design


- User registration
- User login
- User logout
- User authentication with JWT and cookie
- Authentication middleware for protected routes (with Web Crypto API)


- User liked movies/series
- User recommendations based on liked movies/series


- Movies/series Search (CMD + K)
- Movies/series Toprated
- Movies/series Infinite scroll
- Movie/series Details
- Movie/series Filter by genre
- Movie/series like/unlike

## Getting Started

First, add a `.env.local` file in the root directory with the following content:

```bash
cp .env.example .env.local
```

```dotenv
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
TMDB_API_BASE_URL=https://api.themoviedb.org/3
TMDB_API_KEY=your_api_key
```

Then, install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
