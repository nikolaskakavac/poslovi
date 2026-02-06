import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './models/index.js';
import { seedDatabase } from './migrations/seed.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Static files - za serviranje uploadovanih fajlova
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);

// Health check
app.get('/api/health', async (req, res) => {
  try {
    // Check database connection
    await db.sequelize.authenticate();
    
    res.json({
      success: true,
      message: 'Backend je pokrenut i spreman!',
      database: 'CONNECTED',
      backend: 'CONNECTED',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: 'Backend je pokrenut ali baza nije dostupna',
      database: 'DISCONNECTED',
      backend: 'CONNECTED',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta nije pronađena.'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: 'Došlo je do greške na serveru.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Database sync and server start
db.sequelize.sync({ alter: true }).then(async () => {
  console.log('✅ Baza je sinhronizovana!');
  
  // Seed bazu sa test podacima
  await seedDatabase();
  
  app.listen(PORT, () => {
    console.log(`Backend server pokrenut na http://localhost:${PORT}`);
    console.log(`Okruženje: ${process.env.NODE_ENV || 'development'}`);
  });
}).catch(error => {
  console.error('Greška pri konekciji na bazu:', error);
  process.exit(1);
});

export default app;
