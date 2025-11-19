# Backend Setup Guide

## Step-by-Step Installation

### 1. Prerequisites

Make sure you have installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Choose one:
  - Local: [Download MongoDB Community](https://www.mongodb.com/try/download/community)
  - Cloud: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free tier available)

### 2. Install Dependencies

```bash
cd backend
npm install
```

This will install all required packages.

### 3. Configure Environment

```bash
# Copy the example environment file
cp .env.example .env
```

Edit `.env` file with your configuration:

```env
# Server
NODE_ENV=development
PORT=5000

# Database - Choose one option:

# Option 1: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/wisdomquantums

# Option 2: MongoDB Atlas (Recommended)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wisdomquantums

# JWT Secret (Generate a random string)
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long

# JWT Expiration
JWT_EXPIRE=7d

# Admin Credentials
ADMIN_EMAIL=admin@wisdomquantums.com
ADMIN_PASSWORD=Admin@123

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 4. Start MongoDB (If using local)

**Windows:**

```bash
# Start MongoDB service
net start MongoDB
```

**Mac/Linux:**

```bash
# Start MongoDB
mongod --dbpath /path/to/data/directory
```

**Or use MongoDB Compass** (GUI tool)

### 5. Create Admin User

```bash
npm run seed
```

You should see:

```
✅ MongoDB connected
✅ Admin user created successfully
📧 Email: admin@wisdomquantums.com
🔑 Password: Admin@123
⚠️  Please change the password after first login!
```

### 6. Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

You should see:

```
🚀 Server running on port 5000
📍 Environment: development
🌐 API URL: http://localhost:5000/api
✅ MongoDB connected successfully
```

### 7. Test the API

Open your browser or Postman and visit:

```
http://localhost:5000/api/health
```

You should see:

```json
{
  "status": "OK",
  "message": "WisdomQuantums API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🧪 Testing the API

### Using Browser/Postman/Thunder Client

#### 1. Login

```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@wisdomquantums.com",
  "password": "Admin@123"
}
```

Copy the `token` from the response.

#### 2. Get Current User

```http
GET http://localhost:5000/api/auth/me
Authorization: Bearer YOUR_TOKEN_HERE
```

#### 3. Create a Service

```http
POST http://localhost:5000/api/services
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "Web Development",
  "description": "Custom web development services",
  "shortDescription": "Build modern websites",
  "category": "web-development",
  "features": ["Responsive Design", "SEO Optimized"],
  "technologies": ["React", "Node.js"],
  "isActive": true,
  "isFeatured": true
}
```

#### 4. Get All Services

```http
GET http://localhost:5000/api/services
```

## 🔧 Troubleshooting

### MongoDB Connection Error

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**

1. Make sure MongoDB is running
2. Check your `MONGODB_URI` in `.env`
3. If using Atlas, check your IP whitelist

### Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**

1. Change `PORT` in `.env` to another port (e.g., 5001)
2. Or kill the process using port 5000:

**Windows:**

```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Mac/Linux:**

```bash
lsof -ti:5000 | xargs kill -9
```

### JWT Secret Error

**Error:** `secretOrPrivateKey must have a value`

**Solution:**
Make sure `JWT_SECRET` is set in `.env` file.

### Admin Already Exists

**Message:** `⚠️  Admin user already exists`

**Solution:**
This is normal if you've already run the seed script. You can:

1. Use the existing admin credentials
2. Or delete the user from MongoDB and run seed again

## 📱 Connect Frontend

Update your frontend API configuration:

**frontend/src/api/api.js:**

```javascript
const API_URL = "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🚀 Next Steps

1. ✅ Change admin password after first login
2. ✅ Test all API endpoints
3. ✅ Create sample data for testing
4. ✅ Connect frontend to backend
5. ✅ Set up file upload (if needed)
6. ✅ Configure email service (if needed)
7. ✅ Deploy to production

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Documentation](https://jwt.io/)

## 🆘 Need Help?

If you encounter any issues:

1. Check the console for error messages
2. Verify all environment variables are set
3. Make sure MongoDB is running
4. Check the README.md for API documentation
5. Review the error logs

## ✅ Checklist

- [ ] Node.js installed
- [ ] MongoDB installed/configured
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file configured
- [ ] MongoDB running
- [ ] Admin user created (`npm run seed`)
- [ ] Server started (`npm run dev`)
- [ ] API health check successful
- [ ] Login tested
- [ ] CRUD operations tested
- [ ] Frontend connected

**You're all set! Happy coding! 🎉**
