# Rishav Roy - Full Stack Developer Portfolio

A modern, responsive portfolio website built with React, JavaScript, and a comprehensive backend API supporting multiple databases.

## 🚀 Technologies Used

### Frontend
- **React 18** - Modern React with hooks and functional components
- **JavaScript (ES6+)** - No TypeScript, pure JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **Shadcn/ui** - Beautiful UI components
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **PostgreSQL** - Relational database with pg driver
- **MySQL** - Relational database with mysql2 driver
- **JWT** - Authentication and authorization
- **bcryptjs** - Password hashing
- **Nodemailer** - Email functionality
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Additional Tools
- **Concurrently** - Run multiple commands simultaneously
- **Morgan** - HTTP request logger
- **Dotenv** - Environment variable management

## 📁 Project Structure

```
Portfolio_Rishav-Roy-main/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── ui/                   # Shadcn/ui components
│   │   ├── Hero.jsx             # Hero section
│   │   ├── About.jsx            # About section
│   │   ├── Skills.jsx           # Skills section
│   │   ├── Projects.jsx         # Projects section
│   │   ├── Contact.jsx          # Contact section
│   │   ├── Navigation.jsx       # Navigation component
│   │   └── Footer.jsx           # Footer component
│   ├── pages/                   # Page components
│   │   ├── Index.jsx            # Main page
│   │   └── NotFound.jsx         # 404 page
│   ├── hooks/                   # Custom React hooks
│   │   ├── use-mobile.jsx       # Mobile detection hook
│   │   └── use-toast.js         # Toast notification hook
│   ├── lib/                     # Utility functions
│   │   └── utils.js             # Common utilities
│   ├── assets/                  # Static assets
│   ├── App.jsx                  # Main App component
│   ├── main.jsx                 # Application entry point
│   └── index.css                # Global styles
├── server/                      # Backend source code
│   ├── models/                  # Database models
│   │   ├── User.js              # User model
│   │   ├── Project.js           # Project model
│   │   └── Contact.js           # Contact model
│   ├── routes/                  # API routes
│   │   ├── auth.js              # Authentication routes
│   │   ├── users.js             # User management routes
│   │   ├── projects.js          # Project CRUD routes
│   │   └── contact.js           # Contact form routes
│   └── index.js                 # Server entry point
├── public/                      # Public assets
├── package.json                 # Dependencies and scripts
├── vite.config.js               # Vite configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── env.example                  # Environment variables template
└── README.md                    # Project documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (optional, for full functionality)
- PostgreSQL (optional, for full functionality)
- MySQL (optional, for full functionality)

### 1. Clone the repository
```bash
git clone <repository-url>
cd Portfolio_Rishav-Roy-main
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Copy the example environment file and configure your variables:
```bash
cp env.example .env
```

Edit `.env` with your configuration:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key

# Database URLs (configure as needed)
MONGODB_URI=mongodb://localhost:27017/portfolio
POSTGRES_URI=postgresql://username:password@localhost:5432/portfolio
MYSQL_URI=mysql://username:password@localhost:3306/portfolio

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@example.com
```

### 4. Run the application

#### Development Mode (Frontend only)
```bash
npm run dev
```
Frontend will be available at: http://localhost:8080

#### Full Stack Development (Frontend + Backend)
```bash
npm run dev:full
```
- Frontend: http://localhost:8080
- Backend API: http://localhost:5000

#### Production Build
```bash
npm run build
npm run preview
```

## 🗄️ Database Setup

### MongoDB (Primary Database)
1. Install MongoDB locally or use MongoDB Atlas
2. Create a database named `portfolio`
3. Update `MONGODB_URI` in your `.env` file

### PostgreSQL (Optional)
1. Install PostgreSQL
2. Create a database named `portfolio`
3. Update `POSTGRES_URI` in your `.env` file

### MySQL (Optional)
1. Install MySQL
2. Create a database named `portfolio`
3. Update `MYSQL_URI` in your `.env` file

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/like` - Like project

### Contact
- `POST /api/contact/submit` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `GET /api/contact/:id` - Get contact by ID
- `PUT /api/contact/:id/status` - Update contact status
- `POST /api/contact/:id/reply` - Reply to contact

### Users (Admin)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Health Check
- `GET /api/health` - Server health status
- `GET /` - API information

## 🎨 Customization

### Styling
- Modify `src/index.css` for global styles
- Update `tailwind.config.ts` for Tailwind configuration
- Customize component styles in individual component files

### Content
- Update personal information in components
- Modify project data in `src/components/Projects.jsx`
- Change skills in `src/components/Skills.jsx`
- Update contact information in `src/components/Contact.jsx`

### Backend
- Add new models in `server/models/`
- Create new routes in `server/routes/`
- Modify database schemas as needed

## 🚀 Deployment

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure environment variables for production

### Backend Deployment
1. Set up your production environment
2. Configure production database connections
3. Set `NODE_ENV=production`
4. Deploy to your server or cloud platform

### Environment Variables for Production
```env
NODE_ENV=production
JWT_SECRET=your-production-secret-key
MONGODB_URI=your-production-mongodb-uri
EMAIL_USER=your-production-email
EMAIL_PASS=your-production-email-password
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Name:** Rishav Roy
- **Email:** rishavgames04@gmail.com
- **Phone:** +91 7074265417
- **Location:** India

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Vite](https://vitejs.dev/) for fast development experience
- [React](https://reactjs.org/) for the amazing frontend framework
- [Express.js](https://expressjs.com/) for the robust backend framework

---

**Built with ❤️ by Rishav Roy**
