# Admin Panel - WisdomQuantums Solutions

Complete admin panel for managing website content with modern UI and full CRUD operations.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd admin-panel
npm install
```

### 2. Configure Environment

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Development Server

```bash
npm run dev
```

Admin panel will run on: `http://localhost:3000`

## 🔑 Default Login

```
Email: admin@wisdomquantums.com
Password: Admin@123
```

**⚠️ Change password after first login!**

## ✨ Features

### Authentication

- ✅ Secure JWT-based login
- ✅ Role-based access control
- ✅ Profile management
- ✅ Password change

### Dashboard

- ✅ Statistics overview
- ✅ Quick actions
- ✅ System status
- ✅ Recent activity

### Content Management

- ✅ **Services** - Manage service offerings
- ✅ **Projects** - Portfolio management
- ✅ **Blogs** - Blog post management
- ✅ **Testimonials** - Client reviews
- ✅ **Careers** - Job postings
- ✅ **Inquiries** - Contact form submissions
- ✅ **Technologies** - Tech stack
- ✅ **Team** - Team members
- ✅ **Gallery** - Image gallery

### User Management (Superadmin)

- ✅ Create/edit/delete admin users
- ✅ Role assignment
- ✅ Account activation/deactivation

## 📁 Project Structure

```
admin-panel/
├── src/
│   ├── components/
│   │   ├── Common/          # Reusable components
│   │   │   ├── DataTable.jsx
│   │   │   ├── FormInput.jsx
│   │   │   └── Modal.jsx
│   │   └── Layout/          # Layout components
│   │       ├── AdminLayout.jsx
│   │       ├── Header.jsx
│   │       └── Sidebar.jsx
│   ├── context/
│   │   └── AuthContext.jsx  # Authentication context
│   ├── hooks/
│   │   └── useCRUD.js       # Generic CRUD hook
│   ├── pages/               # All pages
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Services.jsx
│   │   ├── Projects.jsx
│   │   ├── Blogs.jsx
│   │   ├── Testimonials.jsx
│   │   ├── Careers.jsx
│   │   ├── Inquiries.jsx
│   │   ├── Technologies.jsx
│   │   ├── Team.jsx
│   │   ├── Gallery.jsx
│   │   ├── Users.jsx
│   │   └── Profile.jsx
│   ├── utils/
│   │   └── api.js           # Axios configuration
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons
- **date-fns** - Date formatting

## 🔧 Available Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📖 Usage Guide

### Login

1. Open `http://localhost:3000`
2. Enter credentials
3. Click Login

### Managing Content

1. Navigate to desired section from sidebar
2. Click "Add" button to create new item
3. Click edit icon to modify existing item
4. Click delete icon to remove item

### Viewing Inquiries

1. Go to Inquiries page
2. Click view icon to see details
3. Update status as needed

### User Management (Superadmin only)

1. Go to Users page
2. Add/edit/delete admin users
3. Assign roles

## 🎯 Key Features

### Responsive Design

- ✅ Mobile-friendly
- ✅ Tablet optimized
- ✅ Desktop enhanced

### Modern UI

- ✅ Clean interface
- ✅ Smooth animations
- ✅ Intuitive navigation
- ✅ Toast notifications

### Security

- ✅ JWT authentication
- ✅ Protected routes
- ✅ Role-based access
- ✅ Auto logout on token expiry

### Performance

- ✅ Fast loading
- ✅ Optimized builds
- ✅ Code splitting
- ✅ Lazy loading

## 🔐 Security Best Practices

1. **Change default password** immediately
2. **Use strong passwords** (min 8 characters)
3. **Don't share credentials**
4. **Logout when done**
5. **Keep software updated**

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
vercel --prod
```

### Deploy to Netlify

```bash
netlify deploy --prod
```

### Environment Variables

Set in production:

```env
VITE_API_URL=https://your-api-domain.com/api
```

## 🐛 Troubleshooting

### Cannot Login

- Check backend is running
- Verify API URL in .env
- Check credentials

### API Errors

- Ensure backend is accessible
- Check CORS settings
- Verify token is valid

### Build Errors

- Clear node_modules and reinstall
- Check Node.js version (16+)
- Update dependencies

## 📝 Notes

- Backend must be running on port 5000
- Admin panel runs on port 3000
- All API calls go through proxy
- Token stored in localStorage

## 🆘 Support

For issues or questions:

- Check backend logs
- Verify API endpoints
- Review browser console
- Check network tab

## ✅ Checklist

- [ ] Install dependencies
- [ ] Configure .env
- [ ] Start backend server
- [ ] Start admin panel
- [ ] Login successfully
- [ ] Test CRUD operations
- [ ] Change default password
- [ ] Deploy to production

**Happy managing! 🎉**
