# 🏠 Hi-Homie

> A full-stack MERN real estate platform where users can buy, sell, rent, and manage properties — with built-in wishlist, enquiry via email & phone, smart filters, and a clean dashboard to manage your own listings.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://render.com/)

---

## 🌐 Live Demo

🔗 **Frontend:** [hi-homie.vercel.app](https://hi-homie.vercel.app)  
🔗 **Backend API:** [hi-homie.onrender.com/api](https://hi-homie.onrender.com/api)

> ⚠️ The backend is hosted on Render's free tier and may take **30–60 seconds** to respond on the first request after inactivity. This is expected — just wait a moment and it'll be up.

---

## 🧠 What is Hi-Homie?

Hi-Homie is a full-stack real estate web application built on the MERN stack. It brings together everything involved in dealing a property — from listing and discovery to enquiry and deal management — in one clean, intuitive platform.

Sellers can list properties with images, set prices, and mark them as **Under Deal** once negotiations begin. Buyers can browse listings with filters, save favourites to their wishlist, and directly contact the property owner via **phone or email** — all without leaving the app. The platform handles auth, image uploads, and real-time data fully end-to-end.

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, Axios, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose ODM) |
| Authentication | JWT (JSON Web Tokens) |
| Image Uploads | Cloudinary |
| Email Enquiries | Nodemailer |
| Frontend Deploy | Vercel |
| Backend Deploy | Render |

---

## ✨ Features

### 🔐 Authentication
- Secure JWT-based register and login
- Google OAuth 2.0 single sign-on
- Auth state persisted in `localStorage` across sessions
- Protected routes — only logged-in users can list or manage properties
- Forgot password flow with email-based reset link (Nodemailer)
- Passwords hashed with bcrypt

### 🏡 Property Listings
- Browse all available properties with images, price, and location
- Create detailed listings with multiple image uploads (via Cloudinary)
- Edit or delete your own listings from a personal dashboard
- Mark any property as **Under Deal** 🤝 to indicate ongoing negotiations

### 🔍 Smart Filters
- 🌍 Search by **city, state, or country** — fully case-insensitive
- 🏷️ Filter by **category** — Buy or Rent
- 💰 Filter by **price range** — five predefined brackets
- 🤝 Filter by **deal status** — Available or Under Deal
- All filters work together and update results instantly

### ❤️ Wishlist
- Save any property to your personal wishlist with a single click
- Wishlist is synced with your account — persists across devices and sessions
- Toggle on/off from any listing card

### 📩 Enquiry System
- Contact the property owner directly via **phone** or **email**
- Email enquiries are sent through **Nodemailer** — the owner receives a formatted email with the buyer's message
- No third-party chat or external redirect needed

### 📋 My Listings Dashboard
- Dedicated page showing all properties you've listed
- Quick access to edit details or delete a listing
- Handles loading, error, and empty states gracefully

---

## 🗂️ Project Structure

```
REAL-ESTATE-PROJECT/
├── client/                   # React frontend
│   ├── src/
│   │   ├── assets/           # Static assets
│   │   ├── components/       # Reusable UI components (PropertyCard, Navbar, etc.)
│   │   ├── context/          # AuthContext — global auth & wishlist state
│   │   ├── data/             # Static data / constants
│   │   ├── pages/            # Page components (Properties, MyListings, etc.)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── server/                   # Express backend
    ├── controllers/          # Route handler logic
    ├── middleware/            # Auth middleware (JWT verify)
    ├── models/               # Mongoose schemas (User, Property)
    ├── routes/               # API route definitions
    ├── uploads/              # Temp upload handling
    └── index.js              # Entry point
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js v18+
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (or local MongoDB)
- A [Cloudinary](https://cloudinary.com/) account for image uploads
- A Gmail account (or SMTP provider) for Nodemailer
- Google Cloud Console account with OAuth 2.0 credentials
  
---

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Nishhh04/Hi-Homie.git
cd Hi-Homie
```

---

### 2️⃣ Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file inside `/server` with the following:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password

VITE_GOOGLE_CLIENT_ID="your-google-client-id"
```

> 💡 For `EMAIL_PASS`, use a [Gmail App Password](https://support.google.com/accounts/answer/185833) — not your regular Gmail password.

Start the backend:

```bash
npm start
```

Backend runs at `http://localhost:5000` ✅

---

### 3️⃣ Setup the Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` ✅

> The frontend points to `https://hi-homie.onrender.com` by default. To use your local backend, update the API base URL in your Axios calls or add a `VITE_API_URL` env variable.

---

## 📡 API Reference

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive a JWT |

### Properties
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/properties` | Get all properties (supports filters) |
| GET | `/api/properties/:id` | Get a single property by ID |
| POST | `/api/properties` | Create a new listing *(auth required)* |
| PUT | `/api/properties/:id` | Update a listing *(auth required)* |
| DELETE | `/api/properties/:id` | Delete a listing *(auth required)* |
| GET | `/api/properties/my-listings` | Get the current user's listings *(auth required)* |

### Wishlist
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/properties/wishlist` | Get the user's saved wishlist *(auth required)* |
| POST | `/api/properties/wishlist/:id` | Toggle a property in the wishlist *(auth required)* |

### Enquiry
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/enquiry/:id` | Send an enquiry email to the property owner *(auth required)* |


## 🔮 Future Enhancements

### 🗺️ Map Integration
Display property locations on an interactive map (Google Maps / Leaflet) so buyers can visually browse by area rather than just text search.

### 💬 In-App Chat
A real-time messaging system between buyer and seller using Socket.io — eliminating the need to go off-platform for negotiation.

### 📊 Seller Analytics
A dashboard for sellers showing views, wishlist saves, and enquiries per listing — helping them understand demand for their properties.

### 🔔 Notifications
Real-time or email notifications to sellers when someone enquires about their property or adds it to their wishlist.

---

## 📝 Notes

- All sensitive credentials (`JWT_SECRET`, Cloudinary keys, email credentials) are stored in `.env` and never committed to the repository.
- The backend uses **Cloudinary** for cloud-based image storage — uploaded images are served via CDN URLs, not stored on the server.
- The location filter uses **MongoDB regex queries** (`$or` across city, state, country) — making it fully case-insensitive and partial-match friendly.
- Render free tier instances spin down after inactivity. The first API call after a period of sleep may take up to 60 seconds — this is a platform limitation, not a bug.
