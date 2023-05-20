# Scrib - Blogging Application

Scrib is a modern, easy-to-use, performant, and scalable blogging application. This application was built with Node.js, Express, MongoDB, GraphQL, React, and TypeScript.

## Project Structure

This project is organized as a monorepo using pnpm for package management. The application is divided into three main parts:

1. `apps/api`: This is the backend of the application. It includes the API endpoints, database models, GraphQL schema, and utility functions.
2. `apps/web`: This is the frontend of the application. It includes the React components, hooks, pages, and GraphQL queries/mutations.
3. `packages`: This directory contains shared code and configurations between the backend and the frontend. It includes UI components (`packages/ui`), configuration files (`packages/config`), and database utilities (`packages/db`).

## Available Scripts

In the project directory, you can run:

- `pnpm start`: Starts the application
- `pnpm apps:build`: Builds the application
- `pnpm apps:dev`: Starts the application in development mode
- `pnpm apps:lint`: Runs the linter
- `pnpm build:graphql`: Generates the GraphQL schema
- `pnpm format:check`: Checks the formatting of the code
- `pnpm format:write`: Formats the code
- `pnpm mongo:restart`: Restarts the MongoDB Docker container
- `pnpm mongo:start`: Starts the MongoDB Docker container
- `pnpm mongo:stop`: Stops the MongoDB Docker container

## Development Instructions

1. Clone the repository.
2. Install dependencies using `pnpm install`.
3. Start the development server using `pnpm apps:dev`.

## License

This project is licensed under the [MIT License](./LICENSE).
