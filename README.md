# Finance App

Finance App is a web application that allows you to track your personal finances. This project helps users monitor their income and expenses. The application features a user-friendly interface and offers a variety of functionalities.

## Project Features

- **Transaction Viewing**: View a list of all your transactions.
- **Transaction Filtering**: Filter transactions by account and date range.
- **Add/Edit/Delete Accounts**: Easily manage your accounts.
- **Add/Edit/Delete Categories**: Organize your transactions by categorizing them.
- **Add New Transaction**: Quickly add new transactions with details like date, account, category, recipient, amount, and notes.

## Technologies Used

- **Next.js**: Framework
- **TypeScript**: Programming Language
- **TanStack Query (React Query)**: Data fetching, caching, and updating
- **Date-fns**: Date and time handling
- **Tailwind CSS**: Styling
- **shadcn-ui**: UI Components
- **Zustand**: State Management
- **React Hook Form**: Form Management
- **Recharts**: Charts
- **Drizzle ORM with PostgreSQL**: Database
- **Clerk**: Authentication

## Installation and Setup

Follow the steps below to run the project locally:

### Install Dependencies

First, install the necessary dependencies:

```bash
npm install

```

### Start Development Server

To run the application locally:

```bash
npm run dev
```

This command will start the development server and open the application in your browser at http://localhost:3000.

### Build for Production

To build the application for production:

```bash
npm run build
```

## Commands

- **dev**: Starts the development server.
- **build**: Builds the application for production.
- **start**: Starts the application in production mode.
- **lint**: Runs ESLint to check the code.
- **db:generate**: Generates the database schema.
- **db:migrate**: Runs the database migrations.
- **db:seed**: Runs custom database scripts.
- **db:studio**: Opens the Drizzle ORM studio.

## Screenshots

### Dashboard

![Dashboard Ekran Görüntüsü](./screenshots/overview.png)

### Transactions

![Transaction Ekran Görüntüsü](./screenshots/transaction-history.png)
![Transaction Ekleme Ekran Görüntüsü](./screenshots/create-transaction.png)
![Transaction Editleme Ekran Görüntüsü](./screenshots/edit-transaction.png)

### Accounts

![Accounts Ekran Görüntüsü](./screenshots/accounts.png)

## Live Demo

You can check out the live demo of the application [here](https://finance-jade.vercel.app/sign-in?redirect_url=https%3A%2F%2Ffinance-jade.vercel.app%2F).
