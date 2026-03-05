# QuickHire - Job Board Platform

A modern job board application built with Next.js and NestJS.

## Project Structure

This is a monorepo containing:
- **Frontend**: Next.js 16 with React 19 and Tailwind CSS
- **Backend**: NestJS API with MongoDB (see `quickserver/README.md`)

## Getting Started

### Frontend Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Backend API

See the [Backend README](./quickserver/README.md) for API documentation and setup instructions.

```bash
cd quickserver
npm install
npm run start:dev
```

The API runs on [http://localhost:3001/api](http://localhost:3001/api)

## Tech Stack

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

### Backend
- NestJS
- MongoDB with Mongoose
- TypeScript
- Class Validator

## Features

- Job listings with search and filters
- Job application submissions
- RESTful API
- MongoDB integration
- Input validation
- CORS enabled

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)

</content>

