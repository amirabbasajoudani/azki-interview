# Project Title

online platform for buying car insurance

## Table of Contents

- [About the Project](#about-the-project)
  - [Prerequisites](#prerequisites)
  - [Built With](#built-with)
- [Good to improve](#good-to-improve)

## About the Project

This project has been built using Next.js (App Router) along with TypeScript and Material UI.

### Prerequisites

- Node.js (version 20.X.X)
- pnpm (version 9.X.X)

### Built With

1.  **Docker Compose Commands:**

    To build the project using Docker Compose, use the following commands:

        - **Development Mode:**

        Runs the project in development mode with live reloading.

        ```bash
        docker-compose up -d dev
        ```

        - **Production Mode:**

        Runs the project in production mode.

        ```bash
        docker-compose up -d prod
        ```

2.  **pnpm Commands:**

    To build the project using pnpm, use the following commands:

        - **Development Mode:**

        Runs the project in development mode with live reloading.

        ```bash
        pnpm install
        ```
        ```bash
        pnpm dev
        ```

        - **Production Mode:**

        Runs the project in production mode.

        ```bash
        pnpm install
        ```
        ```bash
        pnpm build
        ```
        ```bash
        pnpm start
        ```

## Good To Improvement

1.  **Refactor type definitions to be more abstract for greater flexibility.**
2.  **Implement a step-by-step view using the Template Method design pattern to select insurance data, thereby reducing duplication across pages.**
3.  **Utilize React Query's prefetching capabilities to retrieve API responses in advance, enhancing the user experience.**
