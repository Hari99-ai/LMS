# LMS Project

A full-stack Learning Management System built with React, Express, MySQL, Socket.IO, and Razorpay.  
The app supports student login, course browsing, subscriptions, quizzes, chat, contact forms, and an admin dashboard for managing content and viewing statistics.

## Features

- User signup, login, logout, and profile management
- Role-based access control for `USER` and `ADMIN`
- Admin dashboard with user stats, course management, and lecture controls
- Course creation, lecture upload, and quiz management
- Subscription and payment flow using Razorpay
- Real-time community chat with Socket.IO
- Contact form and email notifications
- Password reset / enrollment email support

## Tech Stack

- Frontend: React, Vite, Redux Toolkit, React Router, Tailwind CSS, DaisyUI, Chart.js
- Backend: Node.js, Express, MySQL, Socket.IO
- Services: Cloudinary, Razorpay, Nodemailer

## Project Structure

```text
FRONTEND/   React app
SERVER/     Express API, database, and realtime server
```

## Requirements

- Node.js 18+ recommended
- MySQL database
- Cloudinary account
- Razorpay account for subscriptions
- Gmail app password for email delivery

## Setup

### 1. Install dependencies

```bash
cd SERVER
npm install

cd ../FRONTEND
npm install
```

### 2. Configure the backend environment

Create `SERVER/.env` with values like these:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret
JWT_TOKEN_EXPIRY=7d

MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=lms_project

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret
RAZORPAY_PLAN_ID=your_subscription_plan_id

GMAIL_USERNAME=your_gmail_address
GMAIL_APP_PASSWORD=your_gmail_app_password
SMTP_FROM_MAIL=optional_sender_email
GMAIL_HOST_NAME=gmail
GMAIL_PORT=465
```

Notes:

- The backend reads `SERVER/.env` directly.
- The MySQL schema is created automatically on startup if the tables do not exist.
- `RAZORPAY_*` and Gmail settings are only needed if you use payments and email features.

### 3. Configure the frontend environment

Create `FRONTEND/.env` if you want to override the API URL:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

If this is not set, the frontend defaults to `http://localhost:5000/api/v1`.

## Run the project

### Backend

```bash
cd SERVER
npm run dev
```

### Frontend

```bash
cd FRONTEND
npm run dev
```

## Production Checklist

Before deploying, make sure you have:

- `NODE_ENV=production` in the server environment
- a real `FRONTEND_URL` or `FRONTEND_URLS` value for your deployed frontend
- a strong `JWT_SECRET`
- production MySQL credentials or `MYSQL_URL`
- Cloudinary, Razorpay, and Gmail credentials if those features are enabled

Recommended deployment steps:

1. Build the frontend with `npm run build` inside `FRONTEND`
2. Start the backend with `npm start` inside `SERVER`
3. Serve the frontend build from a static host or platform of your choice
4. Put the backend behind HTTPS so secure cookies and payment callbacks work correctly

## Default URLs

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api/v1`
- Health check: `http://localhost:5000/health`

## Admin Panel

The app includes an admin-only dashboard at `/admin/dashboard`.

- Admin links appear only when the logged-in user has role `ADMIN`
- Backend routes also protect admin actions with authorization middleware

## Useful API Groups

- `/api/v1/user`
- `/api/v1/courses`
- `/api/v1/quizzes`
- `/api/v1/payment`
- `/api/v1/chat`
- `/api/v1/email`
- `/api/v1/data`

## Notes

- The backend uses MySQL tables for users, courses, quizzes, chats, payments, contact messages, and subscriptions.
- Socket.IO is used for real-time chat.
- Some routes require authentication and specific roles.

## License

ISC
