# 🐾 TailTrail — Lost & Found Pets App

TailTrail is a **full-stack Lost & Found Pets platform** that helps pet owners report, find, and recover lost pets.  
It provides a secure and map-based way to share and discover nearby lost or found pets.

---

## 🚀 Tech Stack

### 🧠 Backend
- **Node.js**, **Express**, **TypeScript**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Cloudinary** for image uploads
- **bcrypt** for password hashing
- **express-validator** for input validation
- **GeoJSON + MongoDB 2dsphere Index** for map-based queries

### 💻 Frontend (Planned)
- **React.js + Vite**
- **Axios**, **Redux Toolkit**
- **React Router**, **TailwindCSS**

### 📱 Mobile (Planned)
- **React Native (Expo)**
- **React Navigation**
- **Axios**

---

## 📦 Backend Features

| Feature | Description |
|----------|-------------|
| 🔐 **Auth System** | Signup, Login, JWT tokens, hashed passwords |
| 👤 **User Profile** | Update user info, change password |
| 🐶 **Pet Posts** | Full CRUD (Lost/Found/Resolved) |
| 📸 **Image Uploads** | Cloudinary integration with automatic cleanup |
| 🗺️ **Geo-Search** | Find nearby pets using latitude/longitude |
| 🧭 **Distance Calculation** | Returns distance between pets and user in km |
| 🧹 **Soft Delete** | Posts can be deleted safely without losing data |
| 🧾 **Validation & Security** | Input validation and sanitized API structure |

---

## 🧭 API Endpoints

### **Auth**
| Method | Endpoint | Description |
|---------|-----------|-------------|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Authenticate and get JWT token |

### **Users**
| Method | Endpoint | Description |
|---------|-----------|-------------|
| `GET` | `/api/users/me` | Get user profile |
| `PUT` | `/api/users/me` | Update profile |
| `PUT` | `/api/users/change-password` | Change password |

### **Pets**
| Method | Endpoint | Description |
|---------|-----------|-------------|
| `POST` | `/api/pets` | Create new pet post (with image upload) |
| `GET` | `/api/pets` | Get all pets (filters: type, status, city) |
| `GET` | `/api/pets/:id` | Get pet details |
| `PUT` | `/api/pets/:id` | Update pet (replace/add photos) |
| `PATCH` | `/api/pets/:id/resolve` | Mark as resolved |
| `DELETE` | `/api/pets/:id` | Delete post (soft delete) |
| `GET` | `/api/pets/near` | Find nearby pets (returns distance in km) |