# WisdomQuantums Solutions - Backend API

Complete backend API with authentication, CRUD operations, and admin panel.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Setup

```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your configuration
```

### 3. Start MongoDB

Make sure MongoDB is running locally or use MongoDB Atlas.

### 4. Seed Admin User

```bash
npm run seed
```

This creates an admin user with:

- Email: admin@wisdomquantums.com
- Password: Admin@123

**⚠️ Change the password after first login!**

### 5. Start Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will run on: `http://localhost:5000`

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@wisdomquantums.com",
  "password": "Admin@123"
}
```

Response:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "name": "Admin",
      "email": "admin@wisdomquantums.com",
      "role": "superadmin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Get Current User

```http
GET /api/auth/me
Authorization: Bearer YOUR_TOKEN
```

#### Update Profile

```http
PUT /api/auth/profile
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "name": "New Name",
  "email": "newemail@example.com"
}
```

#### Change Password

```http
PUT /api/auth/change-password
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword"
}
```

### CRUD Operations

All resources follow the same pattern:

#### Get All Items

```http
GET /api/{resource}?page=1&limit=10&sort=-createdAt&search=keyword
```

Query Parameters:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sort`: Sort field (prefix with - for descending)
- `search`: Search keyword
- Any model field for filtering

#### Get Single Item

```http
GET /api/{resource}/:id
```

#### Create Item (Admin Only)

```http
POST /api/{resource}
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  // Item data
}
```

#### Update Item (Admin Only)

```http
PUT /api/{resource}/:id
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  // Updated data
}
```

#### Delete Item (Admin Only)

```http
DELETE /api/{resource}/:id
Authorization: Bearer YOUR_TOKEN
```

### Available Resources

1. **Services** - `/api/services`
2. **Projects** - `/api/projects`
3. **Blogs** - `/api/blogs`
4. **Testimonials** - `/api/testimonials`
5. **Careers** - `/api/careers`
6. **Inquiries** - `/api/inquiries`
7. **Technologies** - `/api/technologies`
8. **Team** - `/api/team`
9. **Gallery** - `/api/gallery`

### Admin Routes

#### Dashboard Stats

```http
GET /api/admin/dashboard/stats
Authorization: Bearer YOUR_TOKEN
```

#### User Management (Superadmin Only)

```http
GET /api/admin/users
POST /api/admin/users
PUT /api/admin/users/:id
DELETE /api/admin/users/:id
Authorization: Bearer YOUR_TOKEN
```

## 📋 Models

### Service

```javascript
{
  title: String,
  slug: String,
  description: String,
  shortDescription: String,
  icon: String,
  image: String,
  features: [String],
  technologies: [String],
  category: String,
  price: { startingFrom: Number, currency: String },
  isActive: Boolean,
  isFeatured: Boolean,
  order: Number,
  seo: { metaTitle, metaDescription, keywords }
}
```

### Project

```javascript
{
  title: String,
  slug: String,
  description: String,
  shortDescription: String,
  client: { name, company, logo },
  category: String,
  technologies: [String],
  images: [{ url, caption }],
  thumbnail: String,
  liveUrl: String,
  githubUrl: String,
  duration: { startDate, endDate },
  teamSize: Number,
  status: String,
  isActive: Boolean,
  isFeatured: Boolean,
  order: Number,
  seo: { metaTitle, metaDescription, keywords }
}
```

### Blog

```javascript
{
  title: String,
  slug: String,
  content: String,
  excerpt: String,
  author: ObjectId,
  category: String,
  tags: [String],
  featuredImage: String,
  images: [{ url, caption }],
  isPublished: Boolean,
  publishedAt: Date,
  views: Number,
  readTime: Number,
  seo: { metaTitle, metaDescription, keywords }
}
```

### Inquiry

```javascript
{
  name: String,
  email: String,
  phone: String,
  company: String,
  subject: String,
  message: String,
  service: ObjectId,
  status: String,
  priority: String,
  notes: [{ text, addedBy, addedAt }],
  assignedTo: ObjectId
}
```

### Career

```javascript
{
  title: String,
  slug: String,
  department: String,
  location: String,
  type: String,
  experience: { min, max },
  salary: { min, max, currency },
  description: String,
  responsibilities: [String],
  requirements: [String],
  skills: [String],
  benefits: [String],
  isActive: Boolean,
  applicationDeadline: Date,
  applicationsCount: Number
}
```

### Testimonial

```javascript
{
  name: String,
  position: String,
  company: String,
  companyLogo: String,
  avatar: String,
  testimonial: String,
  rating: Number,
  project: ObjectId,
  isActive: Boolean,
  isFeatured: Boolean,
  order: Number
}
```

### Technology

```javascript
{
  name: String,
  slug: String,
  description: String,
  icon: String,
  logo: String,
  category: String,
  proficiencyLevel: Number,
  isActive: Boolean,
  order: Number
}
```

### Team

```javascript
{
  name: String,
  position: String,
  department: String,
  bio: String,
  avatar: String,
  email: String,
  phone: String,
  social: { linkedin, twitter, github, website },
  skills: [String],
  isActive: Boolean,
  order: Number
}
```

### Gallery

```javascript
{
  title: String,
  description: String,
  image: String,
  thumbnail: String,
  category: String,
  tags: [String],
  isActive: Boolean,
  order: Number
}
```

## 🔒 Security Features

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- Helmet security headers
- CORS configuration
- Input validation
- Role-based access control

## 🛠️ Tech Stack

- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Express Validator** - Input validation

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── auth.controller.js
│   └── base.controller.js
├── middleware/
│   ├── auth.middleware.js
│   └── validation.middleware.js
├── models/
│   ├── User.model.js
│   ├── Service.model.js
│   ├── Project.model.js
│   ├── Blog.model.js
│   ├── Inquiry.model.js
│   ├── Career.model.js
│   ├── Testimonial.model.js
│   ├── Technology.model.js
│   ├── Team.model.js
│   └── Gallery.model.js
├── routes/
│   ├── auth.routes.js
│   ├── admin.routes.js
│   └── [resource].routes.js
├── scripts/
│   └── seedAdmin.js
├── utils/
│   └── generateToken.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## 🧪 Testing with Postman/Thunder Client

1. Import the API endpoints
2. Set base URL: `http://localhost:5000/api`
3. Login to get token
4. Add token to Authorization header: `Bearer YOUR_TOKEN`
5. Test CRUD operations

## 🚀 Deployment

### Environment Variables

Set these in production:

- `NODE_ENV=production`
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Strong random string
- `FRONTEND_URL` - Your frontend URL

### Deploy to Heroku

```bash
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
git push heroku main
```

### Deploy to Vercel/Railway

Follow their respective deployment guides.

## 📝 Notes

- Change default admin password after first login
- Use strong JWT_SECRET in production
- Enable MongoDB authentication in production
- Set up proper CORS origins
- Implement rate limiting per your needs
- Add file upload functionality if needed
- Set up email service for notifications

## 🤝 Support

For issues or questions, contact: support@wisdomquantums.com
