# API Usage Examples

Complete examples for all API endpoints.

## 🔐 Authentication

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@wisdomquantums.com",
    "password": "Admin@123"
  }'
```

### Get Current User

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Update Profile

```bash
curl -X PUT http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "email": "newemail@example.com"
  }'
```

### Change Password

```bash
curl -X PUT http://localhost:5000/api/auth/change-password \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "Admin@123",
    "newPassword": "NewPassword@123"
  }'
```

## 📦 Services

### Get All Services

```bash
curl -X GET "http://localhost:5000/api/services?page=1&limit=10"
```

### Get Single Service

```bash
curl -X GET http://localhost:5000/api/services/SERVICE_ID
```

### Create Service

```bash
curl -X POST http://localhost:5000/api/services \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Web Development",
    "description": "Professional web development services using modern technologies",
    "shortDescription": "Build stunning websites",
    "category": "web-development",
    "features": [
      "Responsive Design",
      "SEO Optimized",
      "Fast Performance",
      "Secure"
    ],
    "technologies": ["React", "Node.js", "MongoDB"],
    "price": {
      "startingFrom": 999,
      "currency": "USD"
    },
    "isActive": true,
    "isFeatured": true,
    "order": 1
  }'
```

### Update Service

```bash
curl -X PUT http://localhost:5000/api/services/SERVICE_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Service Title",
    "isActive": false
  }'
```

### Delete Service

```bash
curl -X DELETE http://localhost:5000/api/services/SERVICE_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🚀 Projects

### Create Project

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "E-Commerce Platform",
    "description": "Full-featured e-commerce platform with payment integration",
    "shortDescription": "Modern online store",
    "client": {
      "name": "John Doe",
      "company": "ABC Corp"
    },
    "category": "web",
    "technologies": ["React", "Node.js", "Stripe"],
    "thumbnail": "https://example.com/image.jpg",
    "liveUrl": "https://example.com",
    "duration": {
      "startDate": "2024-01-01",
      "endDate": "2024-03-01"
    },
    "teamSize": 5,
    "status": "completed",
    "isActive": true,
    "isFeatured": true
  }'
```

## 📝 Blogs

### Create Blog

```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Getting Started with React",
    "content": "Full blog content here...",
    "excerpt": "Learn React basics in this comprehensive guide",
    "category": "development",
    "tags": ["react", "javascript", "tutorial"],
    "featuredImage": "https://example.com/image.jpg",
    "isPublished": true,
    "readTime": 10
  }'
```

## 💼 Careers

### Create Job Posting

```bash
curl -X POST http://localhost:5000/api/careers \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior Full Stack Developer",
    "department": "engineering",
    "location": "Remote",
    "type": "full-time",
    "experience": {
      "min": 3,
      "max": 5
    },
    "salary": {
      "min": 80000,
      "max": 120000,
      "currency": "USD"
    },
    "description": "We are looking for an experienced full stack developer...",
    "responsibilities": [
      "Develop and maintain web applications",
      "Write clean, maintainable code",
      "Collaborate with team members"
    ],
    "requirements": [
      "3+ years of experience",
      "Strong knowledge of React and Node.js",
      "Experience with MongoDB"
    ],
    "skills": ["React", "Node.js", "MongoDB", "Git"],
    "benefits": [
      "Competitive salary",
      "Health insurance",
      "Remote work"
    ],
    "isActive": true
  }'
```

## 📧 Inquiries

### Create Inquiry (Public)

```bash
curl -X POST http://localhost:5000/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "company": "ABC Corp",
    "subject": "Project Inquiry",
    "message": "I would like to discuss a project..."
  }'
```

### Get All Inquiries (Admin)

```bash
curl -X GET "http://localhost:5000/api/inquiries?status=new" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Update Inquiry Status

```bash
curl -X PUT http://localhost:5000/api/inquiries/INQUIRY_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "in-progress",
    "priority": "high",
    "notes": [{
      "text": "Contacted client via email"
    }]
  }'
```

## ⭐ Testimonials

### Create Testimonial

```bash
curl -X POST http://localhost:5000/api/testimonials \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "position": "CEO",
    "company": "Tech Solutions Inc",
    "testimonial": "WisdomQuantums delivered an exceptional product. Highly recommended!",
    "rating": 5,
    "isActive": true,
    "isFeatured": true
  }'
```

## 🛠️ Technologies

### Create Technology

```bash
curl -X POST http://localhost:5000/api/technologies \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "React",
    "description": "A JavaScript library for building user interfaces",
    "category": "frontend",
    "proficiencyLevel": 95,
    "isActive": true,
    "order": 1
  }'
```

## 👥 Team

### Create Team Member

```bash
curl -X POST http://localhost:5000/api/team \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Developer",
    "position": "Senior Full Stack Developer",
    "department": "engineering",
    "bio": "Experienced developer with 5+ years in web development",
    "email": "john@wisdomquantums.com",
    "social": {
      "linkedin": "https://linkedin.com/in/johndeveloper",
      "github": "https://github.com/johndeveloper"
    },
    "skills": ["React", "Node.js", "MongoDB"],
    "isActive": true,
    "order": 1
  }'
```

## 🖼️ Gallery

### Create Gallery Item

```bash
curl -X POST http://localhost:5000/api/gallery \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Office Space",
    "description": "Our modern office environment",
    "image": "https://example.com/office.jpg",
    "category": "office",
    "tags": ["office", "workspace"],
    "isActive": true,
    "order": 1
  }'
```

## 📊 Admin Dashboard

### Get Dashboard Stats

```bash
curl -X GET http://localhost:5000/api/admin/dashboard/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Response:

```json
{
  "success": true,
  "data": {
    "projects": 25,
    "services": 8,
    "blogs": 15,
    "inquiries": 42,
    "careers": 5,
    "testimonials": 18,
    "newInquiries": 7,
    "activeJobs": 3
  }
}
```

## 👤 User Management (Superadmin)

### Get All Users

```bash
curl -X GET http://localhost:5000/api/admin/users \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create User

```bash
curl -X POST http://localhost:5000/api/admin/users \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Admin",
    "email": "newadmin@wisdomquantums.com",
    "password": "SecurePassword@123",
    "role": "admin"
  }'
```

### Update User

```bash
curl -X PUT http://localhost:5000/api/admin/users/USER_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "isActive": false
  }'
```

### Delete User

```bash
curl -X DELETE http://localhost:5000/api/admin/users/USER_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🔍 Advanced Queries

### Pagination

```bash
curl -X GET "http://localhost:5000/api/services?page=2&limit=5"
```

### Sorting

```bash
# Ascending
curl -X GET "http://localhost:5000/api/services?sort=title"

# Descending
curl -X GET "http://localhost:5000/api/services?sort=-createdAt"
```

### Search

```bash
curl -X GET "http://localhost:5000/api/services?search=web"
```

### Filtering

```bash
curl -X GET "http://localhost:5000/api/services?category=web-development&isActive=true"
```

### Combined

```bash
curl -X GET "http://localhost:5000/api/services?page=1&limit=10&sort=-createdAt&search=web&isActive=true"
```

## 📝 Notes

- Replace `YOUR_TOKEN` with actual JWT token from login
- Replace `SERVICE_ID`, `INQUIRY_ID`, etc. with actual MongoDB ObjectIds
- All dates should be in ISO 8601 format
- File uploads require multipart/form-data (not shown here)

## 🧪 Testing Tips

1. Use Postman or Thunder Client for easier testing
2. Save your token as an environment variable
3. Create a collection for all endpoints
4. Test error cases (invalid data, unauthorized access, etc.)
5. Verify response status codes and data structure

**Happy testing! 🚀**
