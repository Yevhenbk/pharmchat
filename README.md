# Pharmchat

## Overview
Pharmchat is a Next.js project designed to facilitate communication between users and a chatbot-like system aimed at providing information about pharmaceutical drugs. The project incorporates features such as authentication using Kinde, creating and deleting different chat sessions, querying information from the FDA drugs API, and an AI-powered chat feature called "Ask AI" which runs solely on the client-side.

## Technologies Used
- Next 14: A React framework for building server-side rendered (SSR) applications.
- Prisma: A modern database toolkit for Node.js and TypeScript.
- Kinde: Authentication middleware.
- FDA Drugs API: Provides access to information about pharmaceutical drugs.
- Open Assistant AI: An AI model used for health-related queries within the "Ask AI" feature.

## Features
### Authentication
Pharmchat implements user authentication using Kinde, ensuring secure access to chat functionalities:
- getKindeServerSession() on the server
- useKindeBrowserClient() on the client
- isAuthenticated method for securing routes 

### Chat Sessions
Users can create and delete different chat sessions, allowing them to organize conversations based on specific topics or purposes.

### FDA Drugs API Integration
The application enables users to request information about pharmaceutical drugs from the FDA Drugs API. Queries are processed instantly, providing users with relevant and accurate information.

### Ask AI
Pharmchat includes a separate chat feature called "Ask AI," which is always present and runs exclusively on the client-side. This feature utilizes the Open Assistant AI model to answer health-related questions posed by users. The conversations in this mode are not saved, ensuring privacy and data security.

## Setup Instructions

> To start the app run this command inside the project

```bash
npm install #install the dependencies
npm run dev #runs the app in the development mode

npx prisma migrate dev #create and apply migrations
npx prisma generate #generate prisma client
```

## Project Preview

### Homw View
![Home View](https://github.com/Yevhenbk/pharmchat/blob/master/public/img/homeview.png)
### Chat List
![Chat List](https://github.com/Yevhenbk/pharmchat/blob/master/public/img/chatlist.png)
### Chat
![Chat](https://github.com/Yevhenbk/pharmchat/blob/master/public/img/chat.png)
### Ask AI
![Ask AI](https://github.com/Yevhenbk/pharmchat/blob/master/public/img/askai.png)
### Warning
![Warning](https://github.com/Yevhenbk/pharmchat/blob/master/public/img/warning.png)
