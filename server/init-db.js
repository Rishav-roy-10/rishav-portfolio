import mongoose from 'mongoose';
import { Pool } from 'pg';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import User from './models/User.js';
import Project from './models/Project.js';
import Contact from './models/Contact.js';

dotenv.config();

// Sample projects data
const sampleProjects = [
  {
    title: "TO-DO-List App",
    description: "A clean and intuitive task management application with add, delete, and mark complete functionality. Features a modern UI with smooth animations and local storage.",
    technologies: ["React", "JavaScript", "CSS3", "Local Storage"],
    image: "/placeholder.svg",
    liveUrl: "https://rishav-roy-10.github.io/To-do-list/",
    githubUrl: "https://github.com",
    status: "Completed",
    featured: true,
    category: "Frontend",
    difficulty: "Intermediate",
    tags: ["React", "JavaScript", "Task Management"]
  },
  {
    title: "Password Generator",
    description: "A secure random password generator with customizable length and character options. Features copy-to-clipboard functionality and strength indicators.",
    technologies: ["JavaScript", "HTML5", "CSS3", "Crypto API"],
    image: "/placeholder.svg",
    liveUrl: "https://rishav-roy-10.github.io/Password-generator/",
    githubUrl: "https://github.com",
    status: "Completed",
    featured: true,
    category: "Frontend",
    difficulty: "Beginner",
    tags: ["JavaScript", "Security", "Password"]
  },
  {
    title: "Weather App",
    description: "A responsive weather application that displays current weather conditions with beautiful gradients. Features city search, humidity, and wind speed data.",
    technologies: ["React", "Weather API", "CSS3", "Geolocation API"],
    image: "/placeholder.svg",
    liveUrl: "https://rishav-roy-10.github.io/Weather-App/",
    githubUrl: "https://github.com",
    status: "Completed",
    featured: true,
    category: "Full Stack",
    difficulty: "Intermediate",
    tags: ["React", "API", "Weather"]
  },
  {
    title: "QR Code Generator",
    description: "A simple QR code generator that converts text or URLs into QR codes. Features instant generation, downloadable codes, and responsive design.",
    technologies: ["JavaScript", "QR.js Library", "HTML5", "CSS3"],
    image: "/placeholder.svg",
    liveUrl: "https://rishav-roy-10.github.io/QR-code-generetor/",
    githubUrl: "https://github.com",
    status: "Completed",
    featured: false,
    category: "Frontend",
    difficulty: "Beginner",
    tags: ["JavaScript", "QR Code", "Utility"]
  }
];

// Sample admin user
const adminUser = {
  name: "Rishav Roy",
  email: "admin@example.com",
  password: "admin123",
  role: "admin",
  bio: "Full Stack Developer passionate about building modern web applications",
  skills: ["React", "JavaScript", "Node.js", "MongoDB", "PostgreSQL", "MySQL"],
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  }
};

// Initialize MongoDB
const initMongoDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log('⚠️  MongoDB URI not configured, skipping MongoDB initialization');
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Contact.deleteMany({});

    // Create admin user
    const user = new User(adminUser);
    await user.save();
    console.log('✅ Admin user created');

    // Create sample projects
    for (const projectData of sampleProjects) {
      const project = new Project(projectData);
      await project.save();
    }
    console.log('✅ Sample projects created');

    console.log('✅ MongoDB initialization completed');
  } catch (error) {
    console.error('❌ MongoDB initialization failed:', error);
  }
};

// Initialize PostgreSQL
const initPostgreSQL = async () => {
  try {
    if (!process.env.POSTGRES_URI) {
      console.log('⚠️  PostgreSQL URI not configured, skipping PostgreSQL initialization');
      return;
    }

    const pool = new Pool({
      connectionString: process.env.POSTGRES_URI,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });

    // Create tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        avatar TEXT,
        bio TEXT,
        skills TEXT[],
        social_links JSONB,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        technologies TEXT[],
        image TEXT,
        live_url TEXT,
        github_url TEXT,
        status VARCHAR(50) DEFAULT 'Completed',
        featured BOOLEAN DEFAULT false,
        category VARCHAR(50) DEFAULT 'Full Stack',
        difficulty VARCHAR(50) DEFAULT 'Intermediate',
        completion_date DATE,
        tags TEXT[],
        views INTEGER DEFAULT 0,
        likes INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'New',
        priority VARCHAR(50) DEFAULT 'Medium',
        ip_address VARCHAR(45),
        user_agent TEXT,
        replied_at TIMESTAMP,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ PostgreSQL tables created');

    // Insert sample data
    await pool.query(`
      INSERT INTO users (name, email, password, role, bio, skills, social_links)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (email) DO NOTHING
    `, [
      adminUser.name,
      adminUser.email,
      adminUser.password, // In production, this should be hashed
      adminUser.role,
      adminUser.bio,
      adminUser.skills,
      JSON.stringify(adminUser.socialLinks)
    ]);

    for (const project of sampleProjects) {
      await pool.query(`
        INSERT INTO projects (title, description, technologies, image, live_url, github_url, status, featured, category, difficulty, tags)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `, [
        project.title,
        project.description,
        project.technologies,
        project.image,
        project.liveUrl,
        project.githubUrl,
        project.status,
        project.featured,
        project.category,
        project.difficulty,
        project.tags
      ]);
    }

    console.log('✅ PostgreSQL sample data inserted');
    await pool.end();
  } catch (error) {
    console.error('❌ PostgreSQL initialization failed:', error);
  }
};

// Initialize MySQL
const initMySQL = async () => {
  try {
    if (!process.env.MYSQL_URI) {
      console.log('⚠️  MySQL URI not configured, skipping MySQL initialization');
      return;
    }

    const pool = mysql.createPool(process.env.MYSQL_URI);

    // Create tables
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        avatar TEXT,
        bio TEXT,
        skills JSON,
        social_links JSON,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        technologies JSON,
        image TEXT,
        live_url TEXT,
        github_url TEXT,
        status VARCHAR(50) DEFAULT 'Completed',
        featured BOOLEAN DEFAULT false,
        category VARCHAR(50) DEFAULT 'Full Stack',
        difficulty VARCHAR(50) DEFAULT 'Intermediate',
        completion_date DATE,
        tags JSON,
        views INT DEFAULT 0,
        likes INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'New',
        priority VARCHAR(50) DEFAULT 'Medium',
        ip_address VARCHAR(45),
        user_agent TEXT,
        replied_at TIMESTAMP NULL,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ MySQL tables created');

    // Insert sample data
    await pool.execute(`
      INSERT IGNORE INTO users (name, email, password, role, bio, skills, social_links)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      adminUser.name,
      adminUser.email,
      adminUser.password, // In production, this should be hashed
      adminUser.role,
      adminUser.bio,
      JSON.stringify(adminUser.skills),
      JSON.stringify(adminUser.socialLinks)
    ]);

    for (const project of sampleProjects) {
      await pool.execute(`
        INSERT INTO projects (title, description, technologies, image, live_url, github_url, status, featured, category, difficulty, tags)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        project.title,
        project.description,
        JSON.stringify(project.technologies),
        project.image,
        project.liveUrl,
        project.githubUrl,
        project.status,
        project.featured,
        project.category,
        project.difficulty,
        JSON.stringify(project.tags)
      ]);
    }

    console.log('✅ MySQL sample data inserted');
    await pool.end();
  } catch (error) {
    console.error('❌ MySQL initialization failed:', error);
  }
};

// Main initialization function
const initializeDatabases = async () => {
  console.log('🚀 Starting database initialization...\n');

  await initMongoDB();
  console.log('');
  
  await initPostgreSQL();
  console.log('');
  
  await initMySQL();
  console.log('');

  console.log('✅ Database initialization completed!');
  process.exit(0);
};

// Run initialization
initializeDatabases().catch(console.error); 