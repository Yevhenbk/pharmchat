# Pharmchat Readme

## Overview
Pharmchat is a Next.js project designed to facilitate communication between users and a chatbot-like system aimed at providing information about pharmaceutical drugs. The project incorporates features such as authentication using Kinde, creating and deleting different chat sessions, querying information from the FDA drugs API, and an AI-powered chat feature called "Ask AI" which runs solely on the client-side.

## Technologies Used
Next.js: A React framework for building server-side rendered (SSR) applications.
Prisma: A modern database toolkit for Node.js and TypeScript.
Kinde: Authentication middleware for Next.js applications.
FDA Drugs API: Provides access to information about pharmaceutical drugs.
Open Assistant AI: An AI model used for health-related queries within the "Ask AI" feature.
## Features
### Authentication
Pharmchat implements user authentication using Kinde, ensuring secure access to chat functionalities.

### Chat Sessions
Users can create and delete different chat sessions, allowing them to organize conversations based on specific topics or purposes.

### FDA Drugs API Integration
The application enables users to request information about pharmaceutical drugs from the FDA Drugs API. Queries are processed instantly, providing users with relevant and accurate information.

### Ask AI
Pharmchat includes a separate chat feature called "Ask AI," which is always present and runs exclusively on the client-side. This feature utilizes the Open Assistant AI model to answer health-related questions posed by users. The conversations in this mode are not saved, ensuring privacy and data security.

## Setup Instructions
Clone the repository: git clone https://github.com/username/pharmchat.git
Navigate to the project directory: cd pharmchat
Install dependencies: npm install
Set up the database using Prisma:
## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
